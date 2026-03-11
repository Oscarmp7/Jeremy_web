import { useParams } from 'react-router'

export default function ProjectDetailPage() {
  const { slug } = useParams()

  return <div className="page page--project-detail">Project: {slug}</div>
}
