import * as THREE from 'three'

// Broad swept wings, segmented stone panels and a standing deck match the supplied reference.
export function createWingCraft({ craft, mesh, makeMaterial, materials }) {
  const frame = makeMaterial('--deep-green'), edge = makeMaterial('--stone-400')
  const panels = [makeMaterial('--stone-200'), makeMaterial('--stone-200')]
  const accent = makeMaterial('--warm-accent')
  panels[0].color.lerp(accent.color,.3);panels[1].color.lerp(accent.color,.4)
  const plate = (points, material, height, depth = .12) => {
    const shape = new THREE.Shape()
    points.forEach(([x,z],i) => i ? shape.lineTo(x,-z) : shape.moveTo(x,-z))
    shape.closePath()
    const object = mesh(new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.025,bevelSize:.035,bevelSegments:1,steps:1}),material,craft,0,height,0)
    object.rotation.x = -Math.PI/2
    return object
  }
  const outline = [[0,-2.2],[1,-1.45],[2.35,-.65],[3.5,-.2],[4.3,-.3],[3.65,.85],[2.65,1.6],[1.25,1.85],[.52,1.72],[.52,2.25],[-.52,2.25],[-.52,1.72],[-1.25,1.85],[-2.65,1.6],[-3.65,.85],[-4.3,-.3],[-3.5,-.2],[-2.35,-.65],[-1,-1.45]]
  plate(outline,frame,.05,.2)
  for(const side of [-1,1]){
    const segments=[[[.38,-1.55],[1.03,-1.12],[1.15,1.58],[.42,1.5]],[[1.1,-1.09],[2.05,-.58],[2.38,1.46],[1.25,1.63]],[[2.12,-.55],[3.12,-.13],[3.36,.83],[2.5,1.4]],[[3.19,-.1],[4.08,-.2],[3.48,.73]]]
    segments.forEach((points,i)=>plate(points.map(([x,z])=>[x*side,z]),panels[i%2],.28,.065))
    const rib = [[.24,-1.7],[.37,-1.7],[3.38,.83],[3.28,.96]]
    plate(rib.map(([x,z])=>[x*side,z]),edge,.38,.05)
  }
  plate([[-.28,-2.05],[.28,-2.05],[.4,2.1],[-.4,2.1]],edge,.35,.12)
  mesh(new THREE.CylinderGeometry(.68,.76,.16,40),frame,craft,0,.58,0)
  mesh(new THREE.CylinderGeometry(.53,.53,.025,40),panels[1],craft,0,.675,0)
  mesh(new THREE.CylinderGeometry(.41,.41,.028,40),edge,craft,0,.695,0)
  // A soft contact patch anchors the feet without adding fake ground physics.
  const shadowMaterial=new THREE.MeshBasicMaterial({color:frame.color,transparent:true,opacity:.3,depthWrite:false})
  materials.add(shadowMaterial)
  const shadow=mesh(new THREE.CircleGeometry(.38,24),shadowMaterial,craft,0,.72,0,1,.65,1)
  shadow.rotation.x=-Math.PI/2
  const riderMaterial=new THREE.SpriteMaterial({transparent:true,depthWrite:false,opacity:0})
  materials.add(riderMaterial)
  const rider=new THREE.Sprite(riderMaterial)
  rider.center.set(.5,.045);rider.position.set(0,.73,0);rider.scale.set(1.8,3.2,1);craft.add(rider)
  const surfMaterial = riderMaterial.clone()
  materials.add(surfMaterial)
  const surfer = new THREE.Sprite(surfMaterial)
  surfer.center.copy(rider.center); surfer.position.copy(rider.position)
  surfer.scale.set(2.65, 2.98, 1); craft.add(surfer)
  surfer.name = 'portfolio-surfer'; rider.userData.surfer = surfer
  craft.name='wing-craft';rider.name='portfolio-rider'
  return rider
}
