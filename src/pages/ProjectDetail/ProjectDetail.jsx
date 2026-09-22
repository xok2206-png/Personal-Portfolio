import { useParams } from 'react-router-dom'

function ProjectDetail() {
  const { projectId } = useParams()

  return (
    <main id="project_detail">
      <h1>PROJECT DETAIL</h1>
      <p>{projectId}</p>
    </main>
  )
}

export default ProjectDetail
