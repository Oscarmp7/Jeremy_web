# Home Colorization And Projects Redesign Design

**Goal**

Extender el home como una sola experiencia continua incorporando una secuencia inmersiva dedicada a `Colorizacion`, y redisenar la pagina de `Proyectos` con una estructura editorial de estudio inspirada en referencias premium, sin perder claridad comercial ni calidad responsive.

## Checkpoint

El estado previo quedo resguardado en GitHub:

- Branch: `feat/m4-redesign`
- Commit: `a9ccf40`

## Decisiones aprobadas

- `Manzana Cuatro` mantiene jerarquia propia y no debe usar el mismo efecto editorial de los navlinks.
- Los navlinks secundarios si conservan el lenguaje de microinteraccion.
- El tratamiento del titulo `Colorizacion` debe sentirse organico, premium y cinematografico.
- El home debe seguir sintiendose como una sola pagina y un solo movimiento.
- El scroll libre debe llegar mas tarde; antes de banners y CTA debe seguir la sensacion de escenario pinneado y controlado.
- La pagina `Proyectos` se redisenara inspirandose en:
  - Scarlet: https://scarlet-dark.framer.media/projects
  - Mike Bennet: https://mikebennet.framer.website/work
  - Create Studio: https://createstudio.framer.media/work

## 1. Navbar Brand Behavior

### `Manzana Cuatro`

La marca no debe competir con los links de navegacion. Se mantiene como ancla tipografica y de identidad, con una microinteraccion propia mucho mas sobria:

- leve ajuste de tracking
- sutil cambio de presencia/opacidad
- sin animacion por letra

### Navlinks secundarios

`Proyectos`, `Estudio` y `Contacto` mantienen el lenguaje editorial tipo swap ya introducido, pero la salida al quitar el cursor debe refinarse:

- no esperar a que termine el stagger
- revertir desde el estado actual
- salida mas corta que la entrada

Resultado: mejor sensacion de control y menos cola cuando el usuario abandona el hover antes de tiempo.

## 2. Secuencia `Colorizacion` dentro del Home

### Principio

No debe sentirse como otra seccion, sino como una nueva etapa del mismo sistema narrativo del reel.

### Secuencia aprobada

1. Termina el ultimo frame/video actual del reel y queda bien centrado y estabilizado.
2. Mientras ese reel se mantiene fijo, entra el fondo puro del stage de `Colorizacion`.
3. En esa misma transicion, el reel activo se difumina y se lava hacia el color del theme:
   - blanco en light mode
   - negro en dark mode
4. `Colorizacion` cae desde arriba, enorme y en perspectiva, como un letrero pasando frente a camara hasta quedar totalmente legible y centrado.
5. Cuando el titulo ya esta asentado, sube desde abajo el primer reel de colorizacion y se superpone al titulo.
6. El titulo no sube ni se va: queda detras del panel, ocultandose por superposicion.
7. Desde ese primer reel arranca un track horizontal de `3` reels de colorizacion en un mismo plano, como piezas puestas sobre una mesa.
8. El scroll no mueve las piezas una sobre otra; la sensacion debe ser de una camara recorriendo la mesa horizontalmente.
9. Al final del track entra un comparador hero side-by-side con drag real.
10. Recien despues de esta secuencia el home libera el paso hacia banners y CTA.

### Comparador side-by-side

El comparador debe ser hero, grande y elegante. No un widget tecnico. La lectura debe ser inmediata:

- lado A: sin colorizacion
- lado B: colorizado
- drag real con mouse y touch
- soporte de teclado

Se puede apoyar con etiquetado discreto, pero el foco debe estar en la evidencia visual.

### Estado del navbar y toggle

Cuando el stage entra al fondo puro, el `navbar` y el switch `Dark/Light` deben abandonar el tratamiento blanco sobre reel y pasar a usar el color correcto del theme activo:

- light theme: texto negro
- dark theme: texto blanco

Ese cambio ya no debe depender solo de la llegada al `home-end`, sino del estado real del stage del home.

### Criterios de motion

- ritmo continuo con el reel previo
- sin quiebres bruscos de layout
- parallax minimo
- caida del titulo con sensacion de plano/camara, no de simple fade
- recorrido horizontal claro y sin solapamientos falsos
- transicion del titulo al primer reel entendible en un solo gesto

## 3. Rediseno de `Proyectos`

## Lectura de referencias

### Scarlet

Referencia util por:

- claridad estructural
- encabezados fuertes
- lectura limpia de portfolio/casos

### Mike Bennet

Referencia util por:

- protagonismo visual
- ritmo editorial
- sensacion de portfolio con mucha presencia de imagen

### Create Studio

Referencia util por:

- metadata bien jerarquizada
- framing estrategico de cada caso
- combinacion de narracion, tipologia y resultados

## Direccion recomendada

Combinar:

- de Scarlet: la claridad y el orden de acceso
- de Mike Bennet: la presencia de medios y el ritmo visual
- de Create: la capa de estudio, metadata y framing estrategico

## Nueva estructura para `Proyectos`

### Header

- titulo contundente
- breve parrafo de contexto
- no solo trabajos, sino piezas con intencion de marca y resultado visual

### Filtros

- `Todos`
- `Produccion`
- `Colorizacion`
- `Fotografia`
- `Contenido`

### Lista editorial de casos

Cada caso debe tener:

- media protagonista
- titulo fuerte
- cliente
- ano
- categoria
- una linea de objetivo o intencion
- chips de servicios aplicados
- CTA a detalle

### Responsive

#### Desktop

- composicion editorial
- mucho aire
- media dominante
- lectura rapida de metadata

#### Tablet

- misma jerarquia con menor complejidad espacial

#### Mobile

- cards apiladas
- media arriba
- metadata clara
- filtros horizontales accesibles
- cero dependencia de hover

## 4. Colorizacion como capacidad de marca

`Colorizacion` no debe quedar enterrada como bullet de servicio. Debe aparecer en tres niveles:

- Home: como experiencia inmersiva
- Proyectos: como filtro y tipo de trabajo
- Casos concretos: como capacidad demostrable en piezas reales

## 5. Orden de ejecucion recomendado

1. Refinar `Manzana Cuatro` y el comportamiento de salida del hover actual.
2. Disenar e implementar la secuencia `Colorizacion` dentro del home.
3. Redisenar `Proyectos` con la nueva arquitectura editorial.

Ese orden protege el flujo del home y luego extiende el mismo nivel de direccion a la pagina de portfolio.
