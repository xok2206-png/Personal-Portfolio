import { useId } from 'react'

export function HudIcon({name,className=''}){
 const paths={
  preferences:'M4 7h7m4 0h5M4 17h2m4 0h10M11 4v6m-5 4v6',
  book:'M12 6C8 3 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-3-1-6-1-10 2Zm0 0v15',
  menu:'M4 7h16M4 12h16M4 17h16',
  arrow:'M3 12h17m-6-6 6 6-6 6',
  about:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a8 8 0 0 1 16 0v3Z',
  skills:'m12 2 9 5v10l-9 5-9-5V7Zm0 10 9-5M12 12 3 7m9 5v10',
  qa:'M21 11a9 8 0 0 1-9 8H7l-5 3 2-6a8 8 0 0 1-1-5 9 8 0 0 1 18 0ZM7 11h.1m4.9 0h.1m4.9 0h.1',
  contact:'M2 5h20v14H2Zm0 0 10 8L22 5',
  system:'m10 2 4 0 1 3 3 1 3 0 2 4-2 2 0 3 1 3-3 3-3-1-3 1-2 2-4-2 0-3-2-2-3-1 0-4 3-1 1-3Zm6 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  star:'m12 1 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z',
 }
 return <svg className={`hud-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.star}/></svg>
}

export function IslandPlaque(){
 const id=useId()
 return <svg className="island-plaque" viewBox="0 0 240 88" preserveAspectRatio="none" aria-hidden="true">
  <defs><linearGradient id={id} x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#fffdf4" stopOpacity=".95"/><stop offset=".5" stopColor="#dcebf9" stopOpacity=".92"/><stop offset="1" stopColor="#f8f5e9" stopOpacity=".96"/></linearGradient></defs>
  <path d="M23 12H95Q111 12 120 3Q129 12 145 12H217L230 24V64L217 76H145Q129 76 120 85Q111 76 95 76H23L10 64V24Z" fill={`url(#${id})`} stroke="#b79a61" strokeWidth="1.5"/>
  <path d="M25 16H96Q111 16 120 8Q129 16 144 16H215L225 26V62L215 72H144Q129 72 120 80Q111 72 96 72H25L15 62V26Z" fill="none" stroke="#fffdf4" strokeWidth="1.3"/>
  <path d="m120 0 4 7-4 7-4-7Zm0 74 4 7-4 7-4-7Z" fill="#f6ead1" stroke="#b79a61" strokeWidth="1"/>
  <path d="M7 28v32M233 28v32" stroke="#fffdf4" strokeWidth="1" opacity=".8"/>
 </svg>
}
