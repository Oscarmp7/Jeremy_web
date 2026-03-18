import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="page project-detail__not-found">
      <h1>Pagina no encontrada</h1>
      <p>La ruta que intentaste abrir no existe o fue movida.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}
