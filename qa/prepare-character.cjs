const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs=require('node:fs/promises')
;(async()=>{
 const src='C:/Users/EZEN/.codex/generated_images/01a0e5e8-ed3f-7723-b64f-bae0878ff3bf/exec-1531b7e7-87ab-40dd-b16a-426b68366b6f.png';const out='public/assets/production/images/project-gallery/character';await fs.mkdir(out,{recursive:true});await fs.copyFile(src,out+'/atlas-source.png');
 const {data,info}=await sharp(src).ensureAlpha().raw().toBuffer({resolveWithObject:true});const {width:w,height:h}=info;const seen=new Uint8Array(w*h),q=new Int32Array(w*h);let head=0,tail=0;
 const add=i=>{if(i<0||i>=w*h||seen[i])return;seen[i]=1;const k=i*4,r=data[k],g=data[k+1],b=data[k+2];if(g>r+25&&g>b+25){q[tail++]=i;data[k+3]=0}};
 for(let x=0;x<w;x++){add(x);add((h-1)*w+x)}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1)}
 while(head<tail){const i=q[head++];if(i%w)add(i-1);if(i%w<w-1)add(i+1);add(i-w);add(i+w)}
 for(let k=0;k<data.length;k+=4){if(data[k+1]>data[k]+25&&data[k+1]>data[k+2]+25)data[k+3]=0}
 const png=await sharp(data,{raw:{width:w,height:h,channels:4}}).png().toBuffer();
 for(const [row,name] of ['front','side','back'].entries()){
  const frames=[];for(let col=0;col<5;col++)frames.push(await sharp(png).extract({left:45+col*265,top:row*374,width:265,height:374}).resize(265,374).png().toBuffer());
  await sharp(frames[0]).webp({quality:94}).toFile(out+'/'+name+'-idle.webp');
  await sharp({create:{width:1060,height:374,channels:4,background:'#00000000'}}).composite(frames.slice(1).map((input,i)=>({input,left:i*265,top:0}))).webp({quality:94}).toFile(out+'/'+name+'-walk.webp');
 }console.log('Prepared three transparent directional pairs; removed background pixels',tail)
})()


