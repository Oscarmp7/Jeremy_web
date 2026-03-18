import { Component } from 'react'
import './ErrorBoundary.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.handleReload = this.handleReload.bind(this)
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  handleReload() {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <section className="page app-error" role="alert">
        <p className="app-error__eyebrow">Runtime fallback</p>
        <h1>La vista encontro un error inesperado.</h1>
        <p>
          La navegacion principal sigue disponible, pero esta ruta necesita recargarse para
          recuperarse.
        </p>
        <div className="app-error__actions">
          <button className="button button--primary" type="button" onClick={this.handleReload}>
            Recargar pagina
          </button>
          <a className="button button--ghost" href="/">
            Volver al inicio
          </a>
        </div>
      </section>
    )
  }
}
