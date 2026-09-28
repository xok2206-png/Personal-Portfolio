import { Link } from 'react-router-dom'
import { profile } from '../../data/content.js'

function Contact() {
  return (
    <div id="contact_world">
      <h1 tabIndex="-1">CONTACT</h1>
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <p>{profile.email ? profile.email : '이메일 준비 중'}</p>
      <Link to="/resume">경력·역량 요약 보기</Link>
      <p>이력서 원본은 준비 중입니다.</p>
      <h2>다음 여정을 함께.</h2>
      <p>디자인과 코드를 연결하는 새로운 경험을 기다립니다.</p>
      <p>DESIGN & DEVELOPMENT · JUNYOUNG<br />WORLD ASSETS · HIGGSFIELD<br />BUILT WITH REACT & VITE</p>
      <Link to="/world-map">Back to World ↗</Link>
    </div>
  )
}

export default Contact
