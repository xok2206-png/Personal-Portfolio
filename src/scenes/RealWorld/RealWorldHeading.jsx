// Keep complete words together while revealing each handwritten glyph in order.
function WritingWords({ text, offset = 0 }) {
  let index = offset
  return text.split(/(\s+)/).map((word, wordIndex) => {
    if (/^\s+$/.test(word)) { index += word.length; return word }
    return <span className="real-writing-word" key={wordIndex}>{Array.from(word).map((letter, letterIndex) => {
      const delay = .18 + index++ * .1
      return <span className="real-writing-letter" key={letterIndex} style={{ '--write-delay': `${delay}s` }}>{letter}</span>
    })}</span>
  })
}

export default function RealWorldHeading({ reduced }) {
  return <h1 className="real-writing-heading" data-reduced={reduced} tabIndex="-1" aria-label="작은 아이디어가 더 나은 경험이 되는 곳">
    <span className="real-writing-line" aria-hidden="true"><WritingWords text="작은 " /><span className="real-credit-highlight"><WritingWords text="아이디어" offset={3} /></span><WritingWords text="가" offset={7} /></span>
    <span className="real-writing-line" aria-hidden="true"><WritingWords text="더 나은 경험이 되는 곳" offset={11} /></span>
  </h1>
}
