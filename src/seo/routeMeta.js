import { showcaseProjects } from '../data/siteContent.js'

export const SITE_URL = 'https://manzanacuatro.com'

const BASE_TITLE = 'Manzana Cuatro'
const BASE_DESCRIPTION =
  'Estudio de produccion audiovisual en Santo Domingo para campanas, contenido social y marcas que necesitan una ejecucion visual premium.'
const DEFAULT_IMAGE = showcaseProjects[0]?.poster ?? `${SITE_URL}/favicon.svg`

const normalizePath = (pathname = '/') => {
  if (!pathname) {
    return '/'
  }

  const path = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

const createMeta = ({
  title,
  description,
  pathname,
  image = DEFAULT_IMAGE,
  ogType = 'website',
  robots = 'index, follow',
}) => ({
  title,
  description,
  canonicalUrl: `${SITE_URL}${pathname === '/' ? '/' : pathname}`,
  image,
  ogType,
  robots,
})

export function getRouteMeta(pathname) {
  const normalizedPath = normalizePath(pathname)

  if (normalizedPath === '/') {
    return createMeta({
      title: `${BASE_TITLE} | Produccion audiovisual en Santo Domingo`,
      description: BASE_DESCRIPTION,
      pathname: normalizedPath,
    })
  }

  if (normalizedPath === '/proyectos') {
    return createMeta({
      title: `Proyectos | ${BASE_TITLE}`,
      description:
        'Casos seleccionados de produccion audiovisual, filmacion, fotografia y contenido de marca desarrollados por Manzana Cuatro.',
      pathname: normalizedPath,
    })
  }

  if (normalizedPath.startsWith('/proyectos/')) {
    const slug = normalizedPath.replace('/proyectos/', '')
    const project = showcaseProjects.find((entry) => entry.slug === slug)

    if (project) {
      return createMeta({
        title: `${project.title} | ${BASE_TITLE}`,
        description: project.summary,
        pathname: normalizedPath,
        image: project.poster,
        ogType: 'article',
      })
    }
  }

  if (normalizedPath === '/studio') {
    return createMeta({
      title: `Estudio | ${BASE_TITLE}`,
      description:
        'Conoce el enfoque, los servicios y la capacidad de estudio de Manzana Cuatro para marcas y campanas audiovisuales.',
      pathname: normalizedPath,
    })
  }

  if (normalizedPath === '/contacto') {
    return createMeta({
      title: `Contacto | ${BASE_TITLE}`,
      description:
        'Habla con Manzana Cuatro para cotizaciones, contenido social, produccion comercial y campanas audiovisuales en RD.',
      pathname: normalizedPath,
    })
  }

  return createMeta({
    title: `404 | ${BASE_TITLE}`,
    description:
      'La pagina solicitada no existe. Explora el portafolio o vuelve al inicio de Manzana Cuatro.',
    pathname: normalizedPath,
    robots: 'noindex, nofollow',
  })
}
