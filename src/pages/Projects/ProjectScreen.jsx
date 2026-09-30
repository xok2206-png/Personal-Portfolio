import { useState } from 'react'

export default function ProjectScreen({ project, className = '' }) {
  const [failed, setFailed] = useState(false)
  return <div className={`project-screen ${className}`}>
    {project.screen && !failed
      ? <img src={project.screen} alt={`${project.name} 실제 작업 화면`} onError={() => setFailed(true)} />
      : <div className="project-screen-empty"><strong>{project.english}</strong><span>{failed ? '화면을 불러오지 못했습니다.' : '실제 작업 화면 준비 중'}</span></div>}
  </div>
}
