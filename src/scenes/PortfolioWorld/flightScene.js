import * as THREE from 'three'
import { islandLayers } from './layers.config.js'

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
  let last = 0, elapsed = 0, heading = -.25, speed = 0, bank = 0
  const keys = new Set(), craft = new THREE.Group(), propellers = []
  const position = new THREE.Vector3(1, 1.2, 18)
  const projected = new THREE.Vector3(), labelPoint = new THREE.Vector3(), topPoint = new THREE.Vector3(), lookAt = new THREE.Vector3(0, 1, -3)
  const viewport = { width: 0, height: 0, changed: true }
  const islands = [], clouds = [], birds = []
  const waterTime = { value: 0 }
  const makeMaterial = token => { const m = new THREE.MeshStandardMaterial({ color: color(token), roughness: .95 }); materials.add(m); return m }
  const linen = makeMaterial('--ivory'), seam = makeMaterial('--stone-400'), wood = makeMaterial('--deep-green'), trim = makeMaterial('--warm-accent')
  const mesh = (geometry, material, parent, x, y, z, sx = 1, sy = 1, sz = 1) => {
    geometries.add(geometry)
    const object = new THREE.Mesh(geometry, material)
    object.position.set(x, y, z); object.scale.set(sx, sy, sz); parent.add(object); return object
  }
  // Restrained, functional silhouette: linen envelope, timber gondola, two propellers.
  mesh(new THREE.SphereGeometry(1, 32, 20), linen, craft, 0, 3.1, 0, 1.3, 1.25, 2.8)
  for (const z of [-1.8, -.9, 0, .9, 1.8]) {
    const r = Math.sqrt(1 - (z / 2.8) ** 2)
    const points = Array.from({ length: 65 }, (_, i) => new THREE.Vector3(Math.cos(i / 64 * Math.PI * 2) * 1.307 * r, 3.1 + Math.sin(i / 64 * Math.PI * 2) * 1.257 * r, z))
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, .018, 4, true), seam, craft, 0, 0, 0)
  }
  mesh(new THREE.SphereGeometry(1, 16, 10), wood, craft, 0, .15, .15, .65, .38, 1.5)
  mesh(new THREE.BoxGeometry(1.08, .1, 2.15), trim, craft, 0, .43, .15)
  for (const x of [-.6, .6]) for (const z of [-.85, .85]) {
    const rope = new THREE.LineCurve3(new THREE.Vector3(x, .42, z), new THREE.Vector3(x * 1.6, 2.5, z))
    mesh(new THREE.TubeGeometry(rope, 1, .018, 4), seam, craft, 0, 0, 0)
  }
  const tail = mesh(new THREE.BoxGeometry(.06, 1.4, 1.25), wood, craft, 0, 3.5, 2.4)
  tail.rotation.x = -.2
  mesh(new THREE.BoxGeometry(2.3, .06, 1.05), wood, craft, 0, 2.95, 2.45)
  for (const x of [-1.05, 1.05]) {
    mesh(new THREE.CylinderGeometry(.13, .13, .7, 10), trim, craft, x, .4, .8).rotation.x = Math.PI / 2
    const propeller = new THREE.Group(); propeller.position.set(x, .4, 1.2); craft.add(propeller)
    for (let i = 0; i < 3; i++) {
      const blade = mesh(new THREE.BoxGeometry(.12, .7, .035), wood, propeller, 0, 0, 0)
      blade.rotation.z = i * Math.PI / 3
    }
    propellers.push(propeller)
  }
  craft.scale.setScalar(.95); scene.add(craft)
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
      const end = new THREE.Vector3(island.x, island.y - 1.4, island.z + 6)
      const start = position.clone(), distance = start.distanceTo(end)
      const forward = new THREE.Vector3(-Math.sin(heading), 0, -Math.cos(heading))
      const c1 = start.clone().addScaledVector(forward, Math.min(distance * .4, 7))
      const c2 = end.clone().add(new THREE.Vector3(-3, 1.5, 5))
      flight = { id, curve: new THREE.CubicBezierCurve3(start, c1, c2, end), time: 0, duration: clamp(distance / 8, 2.4, 5.2) }
      keys.clear(); root.dataset.flying = id
    },
    reset() { flight = null; position.set(1, 1.2, 18); heading = -.25; clearKeys(); onNear(null); near = null; root.dataset.flying = '' },
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
        position.x = clamp(position.x - Math.sin(heading) * speed * dt, -27, 29)
        position.z = clamp(position.z - Math.cos(heading) * speed * dt, -22, 27)
        const closest = flightPlaces.reduce((best, p) => Math.hypot(position.x - p.x, position.z - p.z - 6) < Math.hypot(position.x - best.x, position.z - best.z - 6) ? p : best)
        position.y = THREE.MathUtils.damp(position.y, closest.y - 1.4, 1, dt)
        root.dataset.flying = ''
      }
      bank = THREE.MathUtils.damp(bank, clamp((heading - oldHeading) / Math.max(dt, .001) * .24, -.32, .32), 3, dt)
      propellers.forEach(p => { p.rotation.z += dt * (3 + speed * 3) })
    }
    craft.position.copy(position); craft.position.y += Math.sin(elapsed * 1.4) * .12
    waterTime.value = elapsed
    craft.rotation.set(-speed * .007, heading, bank)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, position.x * .16, 1.7, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 50 + position.z * .1, 1.7, dt)
    lookAt.x = camera.position.x * .5; camera.lookAt(lookAt)
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
      bird.position.set(Math.sin(elapsed * .024 + offset * .03) * 33, 11 + offset * .4, -26 + offset * 1.2)
      wings.forEach((wing, index) => { wing.rotation.z = Math.sin(elapsed * 4 + offset) * .4 * (index ? 1 : -1) })
    })
    let nextNear = null
    if (!flight) nextNear = flightPlaces.find(p => Math.hypot(position.x - p.x, position.z - p.z - 6) < 4.3)?.id || null
    if (near !== nextNear) { near = nextNear; onNear(near) }
    root.dataset.shipX = position.x.toFixed(2); root.dataset.shipZ = position.z.toFixed(2)
    renderer.render(scene, camera)
    if (!readySent) { readySent = true; onReady() }
    frame = requestAnimationFrame(tick)
  }
  try {
    const loaded = await Promise.all(flightPlaces.map(p => load(`/assets/production/images/seasonal-world/${p.id}-island-flight-v1.webp`)))
    const cloudTexture = await load('/assets/production/images/natural-world/painted-cloud-v1.webp')
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
      clouds.push({ plane, x, z, drift: .012 + i * .003 })
    }
    initialized = true; frame = requestAnimationFrame(tick)
  } catch {
    dispose(); onError()
  }
  return api
}
