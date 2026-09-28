import { faqs } from '../../data/content.js'

function QA() {
  return (
    <div id="qa_world">
      <h1 tabIndex="-1">Q&amp;A</h1>
      {faqs.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  )
}

export default QA
