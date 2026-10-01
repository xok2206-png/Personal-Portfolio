import * as THREE from 'three'

// Two bounded world-space ribbons retain the turn path behind each wing tip.
export function createWingTrails({ scene, craft, camera, color, geometries, materials }) {
  const count = 40, life = 1.4
  let clock = 0, sampleTime = 0, strength = 0
  const eye = new THREE.Vector3(), tangent = new THREE.Vector3(), across = new THREE.Vector3()
  const trails = [-1, 1].map(side => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 6), fades = new Float32Array(count * 2)
    const indices = []
    for (let i = 0; i < count - 1; i++) {
      const j = i * 2
      indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2)
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    geometry.setAttribute('fade', new THREE.BufferAttribute(fades, 1).setUsage(THREE.DynamicDrawUsage))
    geometry.setIndex(indices); geometries.add(geometry)
    const material = new THREE.ShaderMaterial({
      uniforms: { tint: { value: color }, strength: { value: 0 } },
      vertexShader: 'attribute float fade; varying float vFade; void main(){ vFade=fade; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 tint; uniform float strength; varying float vFade; void main(){ gl_FragColor=vec4(tint,vFade*strength); #include <colorspace_fragment> }'.replace('; #include', ';\n#include').replace('> }', '>\n}'),
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    })
    materials.add(material)
    const ribbon = new THREE.Mesh(geometry, material)
    ribbon.name = side < 0 ? 'left-wing-trail' : 'right-wing-trail'
    ribbon.frustumCulled = false; ribbon.visible = false; scene.add(ribbon)
    return { side, geometry, material, ribbon, history: [], tip: new THREE.Vector3(), positions, fades }
  })
  return {
    reset() { trails.forEach(t => { t.history.length = 0; t.ribbon.visible = false }); strength = 0; sampleTime = 0 },
    update(dt, speed, active) {
      if (!active) return strength
      clock += dt; sampleTime += dt
      strength = THREE.MathUtils.damp(strength, THREE.MathUtils.clamp((speed - .6) / 5, 0, .85), 5, dt)
      const sample = sampleTime >= .03
      if (sample) sampleTime = 0
      craft.updateMatrixWorld(true)
      for (const t of trails) {
        t.tip.set(t.side * 4.08, .32, -.2).applyMatrix4(craft.matrixWorld)
        if (sample && speed > .35) {
          t.history.unshift({ point: t.tip.clone(), time: clock })
          if (t.history.length > count - 1) t.history.pop()
        }
        while (t.history.length && clock - t.history.at(-1).time > life) t.history.pop()
        const points = [{ point: t.tip, time: clock }, ...t.history]
        t.ribbon.visible = strength > .005 && points.length > 2
        t.material.uniforms.strength.value = strength
        for (let i = 0; i < count; i++) {
          const item = points[Math.min(i, points.length - 1)]
          const next = points[Math.min(i + 1, points.length - 1)].point
          const previous = points[Math.max(0, Math.min(i - 1, points.length - 1))].point
          tangent.subVectors(next, previous); eye.subVectors(camera.position, item.point)
          across.crossVectors(tangent, eye).normalize()
          const fade = i < points.length ? Math.max(0, 1 - (clock - item.time) / life) : 0
          const halfWidth = .075 * fade
          for (let edge = 0; edge < 2; edge++) {
            const offset = edge ? halfWidth : -halfWidth, j = i * 6 + edge * 3
            t.positions[j] = item.point.x + across.x * offset
            t.positions[j + 1] = item.point.y + across.y * offset
            t.positions[j + 2] = item.point.z + across.z * offset
            t.fades[i * 2 + edge] = fade
          }
        }
        t.geometry.attributes.position.needsUpdate = true
        t.geometry.attributes.fade.needsUpdate = true
      }
      return strength
    },
  }
}
