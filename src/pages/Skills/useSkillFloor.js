import { useEffect, useState } from 'react'

export function constrainSkillFloor(point){
 const x=(point.x-50)/41,y=(point.y-79.5)/14.5,length=Math.max(1,Math.hypot(x,y))
 return {x:50+x/length*41,y:79.5+y/length*14.5}
}
// Project the walk ellipse through the background's actual object-fit: cover crop.
export default function useSkillFloor(stage){
 const [area,setArea]=useState({cx:50,cy:80,rx:40,ry:8})
 useEffect(()=>{
  const node=stage.current,image=node.querySelector('.skill-environment')
  const measure=()=>{const s=node.getBoundingClientRect(),r=image.getBoundingClientRect();if(!s.width||!s.height)return
   const iw=image.naturalWidth||1672,ih=image.naturalHeight||941,scale=Math.max(r.width/iw,r.height/ih)
   const w=iw*scale,h=ih*scale,left=r.x+(r.width-w)/2,top=r.y+(r.height-h)/2
   setArea({cx:(left+w*.5-s.x)/s.width*100,cy:(top+h*.80-s.y)/s.height*100,rx:Math.min(w*.40/s.width*100,44),ry:h*.08/s.height*100})
  }
  const observer=new ResizeObserver(measure);observer.observe(node);observer.observe(image);image.addEventListener('load',measure);window.addEventListener('resize',measure);measure()
  return()=>{observer.disconnect();image.removeEventListener('load',measure);window.removeEventListener('resize',measure)}
 },[stage])
 return area
}
