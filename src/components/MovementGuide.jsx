import { useLocation } from 'react-router-dom'
import './MovementGuide.css'

const controls = {
  '/world-map': [['W / S', '전진 · 감속'], ['A / D', '선회'], ['E', '입장']],
  '/about': [['WASD', '이동'], ['E', '살펴보기']],
  '/skills': [['WASD', '이동'], ['E', '살펴보기']],
  '/projects': [['WASD', '이동'], ['Shift', '달리기'], ['E', '입장']],
}

export default function MovementGuide() {
  const { pathname } = useLocation()
  const items = controls[pathname]
  if (!items) return null
  return <aside className="movement-guide" aria-label="키보드 조작 안내">
    {items.map(([key, label]) => <span key={key}><kbd>{key}</kbd>{label}</span>)}
  </aside>
}
