import { Link, NavLink } from 'react-router-dom'
import './PageHeader.css'
export default function PageHeader({light=false,showNavigation=true}){
 return <header className="page-header" data-light={light}><Link className="page-brand" to="/world-map" aria-label="JY · 월드맵">JY <span>PORTFOLIO</span></Link>{showNavigation&&<nav aria-label="주요 메뉴">{[['World','/world-map'],['About','/about'],['Skills','/skills'],['Projects','/projects'],['Contact','/contact']].map(([name,path])=><NavLink key={path} to={path}>{name}</NavLink>)}</nav>}</header>
}
