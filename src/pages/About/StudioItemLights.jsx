// Traced against terrace-workroom-v2.webp (1672 × 941).
// These are object contours, not floating UI cards or replacement artwork.
const shapes = [
  { id: 'profile', outline: 'M391 486L447 479L459 518L487 527L440 540L405 532Z', point: [446, 483] },
  { id: 'journey', outline: 'M1188 400L1201 403L1191 426L1179 425Z', point: [1197, 402] },
  { id: 'process', outline: 'M485 519L514 509L533 514L546 510L570 515L538 528L519 524L507 525Z', point: [549, 512] },
  { id: 'values', outline: 'M786 379L819 378L815 420L788 418ZM819 344L846 344L847 375L820 376Z', point: [817, 380] },
  { id: 'archive', outline: 'M1368 541L1421 528L1513 548L1511 614L1460 628L1366 588Z', point: [1440, 560] },
]

export default function StudioItemLights({ active, selected }) {
  return <svg className="studio-item-lights" viewBox="0 0 1672 941" aria-hidden="true" focusable="false" data-selected={selected}>
    <defs><filter id="studio-item-soft-light" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter></defs>
    {shapes.map((item, index) => <g key={item.id} className="studio-item-light" data-item={item.id} data-active={active === index} style={{ '--glint-delay': (-index * 2.4) + 's' }}>
      <path className="studio-item-aura" d={item.outline} filter="url(#studio-item-soft-light)" />
      <path className="studio-item-rim" d={item.outline} />
      <g transform={'translate(' + item.point.join(' ') + ')'}>
        <g className="studio-item-glint">
          <circle className="studio-glint-halo" r="12" />
          <path d="M-9 0H9M0-11V11" />
          <circle r="2" />
        </g>
      </g>
    </g>)}
  </svg>
}
