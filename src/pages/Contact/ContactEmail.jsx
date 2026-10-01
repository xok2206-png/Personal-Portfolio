import { useEffect, useRef, useState } from 'react'
// Public JSON endpoint only; private provider keys must never enter the Vite bundle.
const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
export default function ContactEmail({ draft, setDraft, onSent }) {
  const request = useRef(null), mounted = useRef(true)
  const [status, setStatus] = useState('idle')
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; request.current?.abort() } }, [])
  const change = event => setDraft(previous => ({ ...previous, [event.target.name]: event.target.value }))
  const submit = async event => {
    event.preventDefault()
    if (request.current) return
    if (!endpoint) { setStatus('unconfigured'); return }
    const data = Object.fromEntries(new FormData(event.currentTarget))
    if (data.website) return
    setStatus('sending')
    const controller = new AbortController(); request.current = controller
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, subject: 'Portfolio connection' }), signal: controller.signal })
      if (!response.ok) throw new Error('Message rejected')
      if (mounted.current) { setStatus('sent'); setDraft({ name: '', email: '', message: '' }); onSent() }
    } catch { if (mounted.current) setStatus('error') }
    finally { clearTimeout(timeout); request.current = null }
  }
  if (status === 'sent') return <div className="connect-sent" role="status"><span className="connect-sent-orbit" aria-hidden="true"/><h3>전송 완료</h3><p>메시지가 접수되었습니다. 소중한 이야기 감사합니다.</p></div>
  return <form className="connect-form" onSubmit={submit} aria-busy={status === 'sending'}>
    <p className="connect-compose-intro">함께할 프로젝트와 궁금한 이야기를 들려주세요.</p>
    <div className="connect-fields"><label>이름<input placeholder="성함 또는 회사명" name="name" autoComplete="name" required maxLength={80} value={draft.name} onChange={change}/></label><label>답장받을 이메일<input placeholder="name@example.com" name="email" type="email" autoComplete="email" required maxLength={254} value={draft.email} onChange={change}/></label></div>
    <label>메시지<textarea placeholder="프로젝트 내용이나 궁금한 점을 편하게 남겨주세요." name="message" rows={5} required maxLength={5000} value={draft.message} onChange={change}/></label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p className="connect-form-note">남겨주신 이름과 이메일은 문의 답변을 위해 사용합니다.</p>
    {!endpoint && <p className="connect-form-note">메시지 전송 서비스는 아직 연결 전입니다.</p>}
    <p className="connect-status" role="status">{status === 'unconfigured' ? '전송 서비스 연결 전입니다. 작성한 내용은 전송되지 않았습니다.' : status === 'error' ? '전송하지 못했습니다. 작성 내용은 유지되어 있으니 다시 시도해주세요.' : ''}</p>
    <button className="connect-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? '보내는 중…' : '메시지 보내기'}</button>
  </form>
}
