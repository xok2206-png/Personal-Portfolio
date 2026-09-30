import { Link } from 'react-router-dom'
import { projects } from '../../data/content.js'
import CapabilityDemo from './CapabilityDemo.jsx'

export default function CapabilityPanel({ capability, still }) {
  const project = projects.find(item => item.id === capability.project)
  return <article className="sc-capability" aria-labelledby="sc-capability-title">
    <p className="sc-tool-line">사용하는 도구 <span>{capability.tools}</span></p>
    <h3 id="sc-capability-title">{capability.lead}</h3>
    <p className="sc-cap-description">{capability.description}</p>
    {capability.image && <figure className="sc-work-image"><img src={capability.image} alt={capability.imageAlt} onError={event => { event.currentTarget.parentElement.hidden = true }} /><figcaption>{capability.caption}</figcaption></figure>}
    <section className="sc-work" aria-label="작업 사례">
      <h4>{project ? `${project.name}에서 한 일` : capability.portfolio ? '이 포트폴리오에서 한 일' : '직접 확인해 보세요'}</h4>
      <p>{capability.work}</p>
      {project && <><p className="sc-work-state">{project.id === 'animal24' ? '기존 서비스 화면을 다시 설계한 작업입니다.' : project.id === 'sulwhasoo' ? '팀 프로젝트에서 맡은 작업입니다.' : '현재 제작 중인 프로젝트입니다.'}</p><Link className="sc-project-link" to={'/projects/' + project.id}>{project.name} 작업 보기 <span aria-hidden="true">↗</span></Link></>}
      {capability.portfolio && <Link className="sc-project-link" to="/world-map">포트폴리오 공간 보기 <span aria-hidden="true">↗</span></Link>}
    </section>
    {capability.demo && <details className="sc-demo" open={capability.id === 'gsap'}><summary>직접 확인해 보기</summary><CapabilityDemo type={capability.demo} still={still} /></details>}
    <details className="sc-method"><summary>작업 방법 자세히 보기</summary><p>{capability.method}</p></details>
  </article>
}
