# Manzana Cuatro

Sitio portfolio de Manzana Cuatro construido con `React`, `Vite`, `React Router` y transiciones basadas en `GSAP`.

## Scripts

- `npm run dev`: servidor local de desarrollo.
- `npm test`: suite de checks del repo.
- `npm run lint`: validacion de ESLint.
- `npm run build`: build de produccion mas generacion de HTML estatico por ruta para SEO y deep links.

## Deploy

- `GitHub Pages`: el workflow en `.github/workflows/deploy-pages.yml` corre `lint`, `test` y build con `DEPLOY_TARGET=github-pages`.
- `Vercel`: el build produce HTML por ruta (`/`, `/proyectos`, `/studio`, `/contacto` y detalles de proyecto) para que los previews sociales y las rutas directas no dependan de mutaciones de metadatos en cliente.

## Notas Tecnicas

- La home usa `GSAP ScrollTrigger` para la secuencia principal y una comparativa de colorizacion.
- El build postprocesa `dist/index.html` para emitir metadatos canonicos por ruta.
- El proyecto prioriza una visual desktop fuerte sin sacrificar mobile ni crawlers.
