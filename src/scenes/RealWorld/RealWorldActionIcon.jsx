export default function RealWorldActionIcon({ skip = false }) {
  return <svg className="real-action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {skip ? <><path d="m6 5 9 7-9 7Z" /><path d="M19 5v14" /></> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>
}
