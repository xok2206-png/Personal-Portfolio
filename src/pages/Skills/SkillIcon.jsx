export default function SkillIcon({id}){
 if(id==='figma')return <svg viewBox="0 0 40 60" aria-hidden="true"><rect width="20" height="20" rx="10" fill="#f24e1e"/><rect x="20" width="20" height="20" rx="10" fill="#ff7262"/><rect y="20" width="20" height="20" rx="10" fill="#a259ff"/><circle cx="30" cy="30" r="10" fill="#1abcfe"/><rect y="40" width="20" height="20" rx="10" fill="#0acf83"/></svg>
 return <img className="skill-brand-logo" src={'/assets/production/icons/skills/'+id+'.svg'} alt="" aria-hidden="true"/>
}
