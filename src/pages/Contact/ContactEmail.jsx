import { useEffect, useRef, useState } from 'react'

// Configure a public form endpoint; never place private mail API keys in Vite variables.
const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
export default function ContactEmail({onClose}) {
 const dialog=useRef(null), request=useRef(null)
 const [status,setStatus]=useState('idle')
 useEffect(()=>{const previous=document.activeElement;dialog.current.showModal();return()=>{request.current?.abort();previous?.focus?.()}},[])
 const submit=async e=>{
  e.preventDefault()
  if(status==='sending')return
  if(!endpoint){setStatus('unconfigured');return}
  const form=e.currentTarget, data=Object.fromEntries(new FormData(form))
  if(data.website)return
  setStatus('sending');request.current=new AbortController()
  const timeout=setTimeout(()=>request.current.abort(),15000)
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data),signal:request.current.signal})
   if(!response.ok)throw new Error('send failed')
   setStatus('sent');form.reset()
  }catch{setStatus('error')}finally{clearTimeout(timeout)}
 }
 return <dialog ref={dialog} className="contact-email" aria-labelledby="email-title" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <button className="email-close" onClick={onClose} aria-label="이메일 창 닫기">×</button>
  <p className="email-eyebrow">✧ A NEW CONNECTION</p><h2 id="email-title">Send a little hello.</h2>
  <p className="email-intro">함께 만들고 싶은 경험이 있나요?<br/>프로젝트 제안부터 짧은 인사까지, 편하게 남겨주세요.</p>
  <form onSubmit={submit} aria-busy={status==='sending'}>
   <div className="email-fields"><label>이름<input name="name" autoComplete="name" placeholder="이름을 알려주세요" required maxLength={80}/></label><label>회신 이메일<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254}/></label></div>
   <label>제목<input name="subject" placeholder="어떤 이야기로 만나볼까요?" required maxLength={160}/></label>
   <label>메시지<textarea name="message" rows={4} placeholder="프로젝트 내용, 협업 일정 또는 궁금한 점을 적어주세요." required maxLength={5000}/></label>
   <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <p className="email-privacy">남겨주신 이름과 이메일은 문의 답변을 위해서만 사용합니다.</p>
   <p className="email-status" role="status">{status==='unconfigured'?'전송 서비스 연결 전입니다. 작성한 내용은 전송되지 않았습니다.':status==='error'?'전송하지 못했습니다. 내용은 유지되어 있으니 잠시 후 다시 시도해주세요.':status==='sent'?'메시지를 보냈습니다. 소중한 이야기 감사합니다.':''}</p>
   <button className="email-send" disabled={status==='sending'} type="submit">{status==='sending'?'보내는 중…':'메시지 보내기'} <span aria-hidden="true">↗</span></button>
  </form>
 </dialog>
}
