import { siteContent } from '../../data/siteContent'
import './HomeClientBand.css'

const clients = siteContent.clients.map((client) => client.name)
const loopItems = Array.from({ length: 6 }, () => clients).flat()

function ClientGroup({ ariaHidden = false }) {
  return (
    <div className="home-client-band__group" aria-hidden={ariaHidden}>
      {loopItems.map((client, index) => (
        <span key={`${client}-${index}`} className="home-client-band__item">
          {client}
        </span>
      ))}
    </div>
  )
}

export default function HomeClientBand() {
  return (
    <section className="home-client-band" aria-label="Clientes de Manzana Cuatro">
      <div className="home-client-band__viewport">
        <div className="home-client-band__track">
          <ClientGroup />
          <ClientGroup ariaHidden />
        </div>
      </div>
    </section>
  )
}
