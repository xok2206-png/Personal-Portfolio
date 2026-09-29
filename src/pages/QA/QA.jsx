import { faqs } from '../../data/content.js'

function QA() {
  return (
    <section id="qa" aria-labelledby="qa-heading">
      <h2 id="qa-heading" tabIndex="-1">Q&amp;A</h2>
      {faqs.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  )
}

export default QA
