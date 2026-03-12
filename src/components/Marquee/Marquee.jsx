import './Marquee.css'

const clients = ['La Bodega', 'Shibuya', 'Changan', 'Farma Extra', 'Porsche Center']

function MarqueeTrack() {
  return (
    <div className="marquee__track">
      {clients.map((name, i) => (
        <span key={i} className="marquee__item">
          {name}
          <span className="marquee__dot" aria-hidden="true"> · </span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Clientes">
      <div className="separator" />
      <div className="marquee__container">
        <div className="marquee__scroll">
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
      </div>
      <div className="separator" />
    </section>
  )
}
