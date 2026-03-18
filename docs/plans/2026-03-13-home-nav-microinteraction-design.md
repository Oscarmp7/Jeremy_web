# Home Nav Microinteraction Design

**Goal**

Refinar el home con dos ajustes conectados: un navbar desktop con simetria estricta y una microinteraccion de texto elegante, inspirada en el efecto de doble capa revisado, aplicada a los navlinks y al CTA `Comienza tu historia`.

**Decisiones aprobadas**

- El navbar desktop debe pasar a una simetria estricta.
- La microinteraccion debe seguir la recomendacion sobria: reinterpretacion elegante, no una copia literal del efecto aleatorio.
- `Comienza tu historia` se considera parte del home y debe compartir la misma familia de movimiento, pero con una intensidad mas cinematografica que los navlinks.

## Diagnostico actual

- El navbar usa cuatro columnas iguales, pero no se percibe simetrico porque la marca se ancla al inicio, los links centrales al centro y el ultimo al final.
- Los navlinks secundarios ya comparten el mismo `font-weight`, pero la marca se diferencia por familia, escala y posicion.
- `Comienza tu historia` vive en el cierre del home, no en el hero, y hoy solo tiene una linea inferior estatica.

## Direccion visual

La interaccion debe sentirse precisa y premium, no juguetona. La referencia valida es la idea de texto duplicado con desplazamiento vertical, pero reinterpretada para el lenguaje actual del sitio:

- sin caos tipografico
- sin cambio de contenido
- sin ruido excesivo por letra
- con timing controlado y estable

## Interaccion propuesta

### Navbar desktop

- Cada navlink tendra dos capas del mismo texto.
- En hover y focus-visible, la capa principal sube levemente y la segunda entra desde abajo.
- El stagger sera corto y ordenado, no aleatorio.
- La distancia vertical sera pequeña para mantener legibilidad.
- Se puede sumar un leve cambio de opacidad/blur durante el cruce.

Resultado esperado: el navbar se siente vivo y editorial, no "tech demo".

### CTA `Comienza tu historia`

- Reutiliza el mismo patron de doble capa, pero con una presencia mayor.
- Se acompana con un subrayado refinado o una linea activa mas cuidada.
- El movimiento debe sentirse mas amplio y deliberado que en el navbar.
- La legibilidad del titulo no se sacrifica; el efecto debe respetar la escala grande del home.

Resultado esperado: un cierre del home mas memorable y con mas tension visual.

## Arquitectura propuesta

- Crear un componente compartido de texto interactivo, orientado a React y CSS del proyecto.
- Evitar introducir Framer Motion para esta pieza; el sitio ya tiene un lenguaje de movimiento propio y no conviene mezclar paradigmas gratuitamente.
- Usar una API minima que permita:
  - `label`
  - `className`
  - `variant` (`nav`, `hero`)
  - `as` o integracion mediante wrapper para `Link` y `a`

## Responsive y accesibilidad

- El efecto se activa en desktop por hover y en teclado por focus-visible.
- En mobile no dependemos de hover; el texto debe verse limpio sin animacion invasiva.
- Con `prefers-reduced-motion`, el componente mantiene el estilo pero elimina el desplazamiento animado.
- Las capas secundarias se marcan como decorativas para no duplicar lectura en lectores de pantalla.

## Riesgos a evitar

- Aleatoriedad por render que haga la interaccion inconsistente.
- Repetir demasiadas transformaciones por letra y volver el navbar nervioso.
- Usar una implementacion demasiado generica o pesada para solo dos lugares de uso.
- Perder claridad del layout al centrar todo sin ajustar la percepcion optica de la marca.

## Criterio de exito

- El navbar se percibe estrictamente simetrico en desktop.
- Los navlinks comparten una microinteraccion consistente, elegante y discreta.
- `Comienza tu historia` hereda la misma logica visual, pero con mas presencia.
- El home se siente mas premium sin romper performance, accesibilidad ni el tono editorial actual.
