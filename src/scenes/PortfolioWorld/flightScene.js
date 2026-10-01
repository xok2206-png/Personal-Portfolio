import * as THREE from 'three'
import { islandDock, safeFlightPath, moveOutsideIslands } from './flightCollision.js'
import { islandLayers } from './layers.config.js'
import { createWingCraft } from './createWingCraft.js'
import { createWingTrails } from './createWingTrails.js'

export const flightPlaces = [
  { id: 'about', x: -19, y: 4, z: -8, size: 15.5, artTop: .0234 },
  { id: 'skills', x: -9.5, y: -1.2, z: 11, size: 12, artTop: .1029 },
  { id: 'projects', x: 7, y: 5, z: -19, size: 21, artTop: .181 },
  { id: 'contact', x: 22, y: -.5, z: 5, size: 13.7, artTop: .0534 },
]
const clamp = THREE.MathUtils.clamp
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a))

// All continuous world transforms have one owner: this renderer.
export async function createFlightScene({ canvas, labels, root, onNear, onManual, onReady, onError, signal }) {
  const scene = new THREE.Scene()
  const style = getComputedStyle(root)
  const color = token => new THREE.Color(style.getPropertyValue(token).trim())
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 180)
  camera.position.set(0, 28, 53)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  scene.add(new THREE.HemisphereLight(color('--cloud'), color('--deep-green'), 2.1))
  const sun = new THREE.DirectionalLight(color('--ivory'), 2.6)
  sun.position.set(-18, 32, 22); scene.add(sun)
  const textures = new Set(), geometries = new Set(), materials = new Set()
  let disposed = false, initialized = false, readySent = false, frame = 0, active = !document.hidden, paused = false, near = null, flight = null
  let highlighted = ''
  let last = 0, elapsed = 0, heading = -.25, speed = 0, bank = 0, surfBlend = 0
  const keys = new Set(), craft = new THREE.Group(), riderTextures = {}, surfTextures = {}
  const position = new THREE.Vector3(1, 1.2, 18)
  const projected = new THREE.Vector3(), labelPoint = new THREE.Vector3(), topPoint = new THREE.Vector3(), lookAt = new THREE.Vector3(0, 1, -3)
  const viewport = { width: 0, height: 0, changed: true }
  const islands = [], clouds = [], birds = []
  const waterTime = { value: 0 }
  const makeMaterial = token => { const m = new THREE.MeshStandardMaterial({ color: color(token), roughness: .95 }); materials.add(m); return m }
  const wood = makeMaterial('--deep-green')
  const mesh = (geometry, material, parent, x, y, z, sx = 1, sy = 1, sz = 1) => {
    geometries.add(geometry)
    const object = new THREE.Mesh(geometry, material)
    object.position.set(x, y, z); object.scale.set(sx, sy, sz); parent.add(object); return object
  }
  const rider = createWingCraft({ craft, mesh, makeMaterial, materials })
  craft.scale.setScalar(.95); scene.add(craft)
  const wingTrails = createWingTrails({ scene, craft, camera, color: color('--cloud'), geometries, materials })
  for (let i = 0; i < 3; i++) {
    const bird = new THREE.Group(), wings = []
    for (const side of [-1, 1]) {
      const wing = mesh(new THREE.BoxGeometry(.5, .025, .12), wood, bird, side * .2, 0, 0)
      wings.push(wing)
    }
    scene.add(bird); birds.push({ bird, wings, offset: i })
  }
  const loader = new THREE.TextureLoader()
  const load = async path => {
    const texture = await loader.loadAsync(path)
    if (disposed) { texture.dispose(); return texture }
    texture.colorSpace = THREE.SRGBColorSpace; textures.add(texture); return texture
  }
  const dispose = () => {
    if (disposed) return
    disposed = true; cancelAnimationFrame(frame); resizeObserver.disconnect()
    window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup)
    window.removeEventListener('blur', clearKeys); document.removeEventListener('visibilitychange', visibility)
    canvas.removeEventListener('webglcontextlost', contextLost)
    signal?.removeEventListener('abort', dispose)
    textures.forEach(t => t.dispose()); materials.forEach(m => m.dispose()); geometries.forEach(g => g.dispose()); renderer.dispose()
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect()
    viewport.width = width; viewport.height = height; viewport.changed = true
    renderer.setSize(width, height, false); camera.aspect = width / height
    camera.fov = width / height < 1.4 ? 52 : height < 650 ? 48 : 43; camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas); resize()
  function clearKeys() { keys.clear(); speed = 0; bank = 0 }
  function visibility() { active = !document.hidden; clearKeys(); last = 0; if (active && initialized && !frame) frame = requestAnimationFrame(tick) }
  function contextLost(event) { event.preventDefault(); dispose(); onError() }
  function keydown(event) {
    if (paused || !active || event.altKey || event.ctrlKey || event.metaKey || document.querySelector('dialog[open]') || event.target.closest?.('a,button,input,textarea,select,[contenteditable]')) return
    const key = event.key.toLowerCase()
    if (!['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) return
    event.preventDefault(); keys.add(key); flight = null; onManual()
  }
  function keyup(event) { keys.delete(event.key.toLowerCase()) }
  window.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup); window.addEventListener('blur', clearKeys)
  document.addEventListener('visibilitychange', visibility); canvas.addEventListener('webglcontextlost', contextLost)
  signal?.addEventListener('abort', dispose, { once: true })
  const api = {
    dispose,
    highlight(id) { highlighted = id },
    pause(value) { paused = value; clearKeys(); if (value) flight = null },
    fly(id) {
      const island = flightPlaces.find(p => p.id === id)
      if (!island || paused) return
      const dock = islandDock(island)
      const points = safeFlightPath(position, dock, flightPlaces)
      if (!points) { onManual(); return }
      const curve = new THREE.CurvePath()
      for (let i = 1; i < points.length; i++) {
        const a = points[i-1], b = points[i]
        curve.add(new THREE.LineCurve3(new THREE.Vector3(a.x,a.y,a.z),new THREE.Vector3(b.x,b.y,b.z)))
      }
      flight = { id, curve, time: 0, duration: Math.max(2.4, curve.getLength() / 7) }
      keys.clear(); root.dataset.flying = id
    },
    reset() { wingTrails.reset(); flight = null; position.set(1, 1.2, 18); heading = -.25; clearKeys(); onNear(null); near = null; root.dataset.flying = '' },
  }
  function tick(now) {
    frame = 0
    if (disposed || !active) return
    const dt = last ? Math.min((now - last) / 1000, .05) : 0; last = now
    const moving = !paused && !document.querySelector('dialog[open]')
    if (moving) {
      elapsed += dt
      const oldHeading = heading
      if (flight) {
        flight.time = Math.min(flight.time + dt, flight.duration)
        const t = flight.time / flight.duration, eased = t * t * (3 - 2 * t)
        flight.curve.getPoint(eased, position)
        const tangent = flight.curve.getTangent(Math.min(eased, .999))
        heading += angleDelta(heading, Math.atan2(-tangent.x, -tangent.z)) * Math.min(1, dt * 5)
        speed = Math.sin(t * Math.PI) * 6
        if (t === 1) { flight = null; speed = 0; root.dataset.flying = '' }
      } else {
        const steering = Number(keys.has('a') || keys.has('arrowleft')) - Number(keys.has('d') || keys.has('arrowright'))
        heading += steering * dt * .95
        const thrust = keys.has('w') || keys.has('arrowup'), brake = keys.has('s') || keys.has('arrowdown')
        speed = THREE.MathUtils.damp(speed, thrust ? 8 : 0, brake ? 4 : 1.4, dt)
        const dx = clamp(position.x - Math.sin(heading) * speed * dt, -34, 36) - position.x
        const dz = clamp(position.z - Math.cos(heading) * speed * dt, -34, 30) - position.z
        const collided = moveOutsideIslands(position, dx, dz, flightPlaces)
        root.dataset.blocked = String(collided)
        if (collided) speed *= .82
        const closest = flightPlaces.reduce((best, p) => Math.hypot(position.x - p.x, position.z - p.z - 6) < Math.hypot(position.x - best.x, position.z - best.z - 6) ? p : best)
        position.y = THREE.MathUtils.damp(position.y, closest.y - 1.4, 1, dt)
        root.dataset.flying = ''
      }
      bank = THREE.MathUtils.damp(bank, clamp((heading - oldHeading) / Math.max(dt, .001) * .24, -.32, .32), 3, dt)
    }
    craft.position.copy(position); craft.position.y += Math.sin(elapsed * 1.4) * .12
    waterTime.value = elapsed
    craft.rotation.set(-speed * .007, heading, bank)
    const facing = Math.cos(heading) > .55 ? 'back' : Math.cos(heading) < -.55 ? 'front' : 'side'
    const riderTexture = riderTextures[facing] || riderTextures.back
    if (riderTexture && rider.material.map !== riderTexture) { rider.material.map = riderTexture; rider.material.needsUpdate = true }
    const surfer = rider.userData.surfer
    const surfTexture = surfTextures[facing] || surfTextures.back
    const surfing = speed > .45 || Math.abs(bank) > .025
    if (moving) surfBlend = THREE.MathUtils.damp(surfBlend, surfing && surfTexture ? 1 : 0, 9, dt)
    if (riderTexture) { rider.material.opacity = 1 - surfBlend; rider.material.rotation = -bank * .3 }
    if (surfTexture && surfer.material.map !== surfTexture) { surfer.material.map = surfTexture; surfer.material.needsUpdate = true }
    surfer.material.opacity = surfTexture ? surfBlend : 0
    // Balance around planted feet; this renderer owns every pose transform.
    surfer.material.rotation = -bank * .85 + Math.sin(elapsed * 3) * .018 * surfBlend
    surfer.scale.y = 2.98 - Math.min(speed / 8, 1) * .12 + Math.sin(elapsed * 4) * .025 * surfBlend
    root.dataset.riderPose = surfBlend > .5 ? 'surf' : 'idle'
    root.dataset.riderLean = surfer.material.rotation.toFixed(3)
    if (surfTextures.side) { surfTextures.side.repeat.x = Math.sin(heading) > 0 ? -1 : 1; surfTextures.side.offset.x = Math.sin(heading) > 0 ? 1 : 0 }
    if (riderTextures.side) { riderTextures.side.repeat.x = Math.sin(heading) > 0 ? -1 : 1; riderTextures.side.offset.x = Math.sin(heading) > 0 ? 1 : 0 }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, position.x * .16, 1.7, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 50 + position.z * .1, 1.7, dt)
    lookAt.x = camera.position.x * .5; camera.lookAt(lookAt)
    root.dataset.wingTrail = wingTrails.update(dt, speed, moving).toFixed(3)
    islands.forEach(({ plane, place, emphasis, dim }, i) => {
      emphasis.value = THREE.MathUtils.damp(emphasis.value, highlighted === place.id ? 1 : 0, 9, dt)
      dim.value = THREE.MathUtils.damp(dim.value, highlighted && highlighted !== place.id ? 1 : 0, 9, dt)
      plane.quaternion.copy(camera.quaternion); plane.position.y = place.y + Math.sin(elapsed * .55 + i * 1.7) * .13 + emphasis.value * .28
      projected.copy(plane.position).project(camera)
      const el = labels[i]
      if (el) {
        el.style.setProperty('--project-x', `${(projected.x * .5 + .5) * viewport.width}px`)
        el.style.setProperty('--project-y', `${(-projected.y * .5 + .5) * viewport.height}px`)
        // Project the actual sprite's upper silhouette, not its transparent rectangle.
        labelPoint.set(0, place.size * (.5 - place.artTop), 0).applyQuaternion(plane.quaternion).add(plane.position).project(camera)
        el.style.setProperty('--label-y', `${(projected.y - labelPoint.y) * .5 * viewport.height - 12}px`)
        topPoint.set(0, place.size * .5, 0).applyQuaternion(plane.quaternion).add(plane.position).project(camera)
        const height = Math.abs(topPoint.y - projected.y) * viewport.height
        el.style.setProperty('--project-width', `${height * .88}px`); el.style.setProperty('--project-height', `${height * .88}px`)

      }
    })
    viewport.changed = false
    clouds.forEach(({ plane, x, z, drift }, i) => {
      plane.quaternion.copy(camera.quaternion); plane.position.x = x + Math.sin(elapsed * drift + i) * 8
      plane.position.z = z + Math.cos(elapsed * drift * .7 + i) * 2
    })
    birds.forEach(({ bird, wings, offset }) => {
      bird.position.set(Math.sin(elapsed * .055 + offset * .035) * 33, 11 + offset * .4, -26 + offset * 1.2)
      wings.forEach((wing, index) => { wing.rotation.z = Math.sin(elapsed * 4 + offset) * .4 * (index ? 1 : -1) })
    })
    let nextNear = null
    if (!flight) nextNear = flightPlaces.find(p => { const dock = islandDock(p); return Math.hypot(position.x - dock.x, position.z - dock.z) < 3 })?.id || null
    if (near !== nextNear) { near = nextNear; onNear(near) }
    root.dataset.shipX = position.x.toFixed(2); root.dataset.shipZ = position.z.toFixed(2)
    renderer.render(scene, camera)
    if (!readySent) { readySent = true; onReady() }
    frame = requestAnimationFrame(tick)
  }
  try {
    const loaded = await Promise.all(flightPlaces.map(p => load(`/assets/production/images/seasonal-world/${p.id}-island-flight-v1.webp`)))
    const cloudTexture = await load('/assets/production/images/natural-world/painted-cloud-v1.webp')
    // Optional rider textures never block the renderer or the navigation fallback.
    for (const direction of ['back','side','front']) {
      load(`/assets/production/images/projects-world/character/${direction}-idle-v2.webp`)
        .then(texture => { if (!disposed) riderTextures[direction] = texture })
        .catch(() => { /* Retain the loaded view or fly without the decorative rider. */ })
    }
    for (const direction of ['back', 'side', 'front']) {
      load('/assets/production/images/projects-world/character/' + direction + '-surf-v1.webp')
        .then(texture => { if (!disposed) surfTextures[direction] = texture })
        .catch(() => { /* Retain the original rider when a surfing pose fails. */ })
    }
    if (disposed) return api
    flightPlaces.forEach((place, i) => {
      const material = new THREE.MeshBasicMaterial({ map: loaded[i], transparent: true, alphaTest: .025, depthWrite: true, side: THREE.DoubleSide })
      const emphasis = { value: 0 }, dim = { value: 0 }
      // Continuous, bounded refraction: never wrap a non-seamless strip of the painting.
      // The island silhouette and architecture keep their original UV coordinates.
      const falls = islandLayers.find(island => island.id === place.id).water
      material.onBeforeCompile = shader => {
        shader.uniforms.waterTime = waterTime
        shader.uniforms.islandEmphasis = emphasis
        shader.uniforms.islandDim = dim
        shader.fragmentShader = 'uniform float waterTime; uniform float islandEmphasis; uniform float islandDim;\n' + shader.fragmentShader
        const motion = falls.map(([x, y, w, h]) => {
          const f = value => (value / 100).toFixed(5)
          return `{
            vec2 local = (vec2(vMapUv.x, 1.0-vMapUv.y)-vec2(${f(x)},${f(y)}))/vec2(${f(w)},${f(h)});
            float edge = smoothstep(0.0,0.2,local.x)*(1.0-smoothstep(0.8,1.0,local.x))*smoothstep(0.0,0.1,local.y)*(1.0-smoothstep(0.72,1.0,local.y));
            if(local.x>0.0 && local.x<1.0 && local.y>0.0 && local.y<1.0){
              float current = local.y*23.0-waterTime*3.2;
              float detail = sin(local.y*51.0-waterTime*5.1+local.x*6.0);
              // Offset fades to zero at every boundary; the original alpha stays intact.
              vec2 displacement = vec2(sin(current+local.x*9.0)*${f(w * .035)},
                (sin(current)*0.7+detail*0.3)*${f(Math.min(h * .045, .55))})*edge;
              vec4 flow = texture2D(map,vMapUv+displacement);
              float water = smoothstep(-0.015,0.075,diffuseColor.b-diffuseColor.r);
              float blend = edge*water*0.85*flow.a;
              diffuseColor.rgb=mix(diffuseColor.rgb,flow.rgb,blend);
              float glint = pow(0.5+0.5*sin(current+sin(local.x*8.0)),6.0);
              diffuseColor.rgb += diffuseColor.rgb*glint*edge*water*0.09;
            }
          }`
        }).join('\n')
        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n' + motion + `
          float islandLuma = dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));
          diffuseColor.rgb = mix(vec3(islandLuma),diffuseColor.rgb,1.0+islandEmphasis*.10-islandDim*.18);
          diffuseColor.rgb *= 1.0+islandEmphasis*.10-islandDim*.22;
        `)
      }
      material.customProgramCacheKey = () => place.id
      materials.add(material)
      const plane = mesh(new THREE.PlaneGeometry(place.size, place.size), material, scene, place.x, place.y, place.z)
      islands.push({ plane, place, emphasis, dim })
    })
    for (let i = 0; i < 7; i++) {
      const material = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true, opacity: i < 4 ? .26 : .4, depthWrite: false })
      materials.add(material)
      const x = [-28, 18, -4, 35, -24, 12, 33][i], z = [-28, -32, -35, -15, 23, 30, 28][i]
      const plane = mesh(new THREE.PlaneGeometry(26, 13), material, scene, x, i < 4 ? 6 : -3, z)
      clouds.push({ plane, x, z, drift: .03 + i * .004 })
    }
    initialized = true; frame = requestAnimationFrame(tick)
  } catch {
    dispose(); onError()
  }
  return api
}
