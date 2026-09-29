// Foot-contact band on the open stone floor of the tree lookout, in image percentages.
export function constrainToStairs(point, frame) {
 const u=Math.max(28,Math.min(65,(point.x-frame.left)/frame.width*100))
 const v=Math.max(87+(u-28)*.08,Math.min(96,(point.y-frame.top)/frame.height*100))
 return {...point,x:frame.left+u/100*frame.width,y:frame.top+v/100*frame.height}
}
export function placeOnLookout(u,v,frame){return constrainToStairs({x:frame.left+u/100*frame.width,y:frame.top+v/100*frame.height},frame)}
