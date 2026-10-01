import './SeasonalAtmosphere.css'
export default function SeasonalAtmosphere({ season, still = false }) {
  const count = season === 'winter' ? 32 : season === 'spring' ? 18 : 10
  return <div className={'seasonal-atmosphere season-' + season} data-still={still} aria-hidden="true">
    <div className="season-mist"/>
    {Array.from({length:count},(_,i)=><i key={i} className="season-particle" style={{left:((i*37)%103)+'%', '--duration':(season==='cave'?5+i%5:10+i%9)+'s','--delay':(-i*1.73)+'s','--size':(season==='winter'?2+i%4:5+i%5)+'px','--drift':(30+i%5*25)+'px'}}/>)}
  </div>
}
