# ECHOES OF WHO I WAS
## A digital self-portrait

Proyecto web de Proyecto Personal — ELISAVA, desarrollado por Ana Zhang.

La propuesta explora cómo los rastros que dejamos en plataformas digitales participan en la construcción de nuestra identidad y en la manera en que recordamos quiénes hemos sido.

> Un viaje por mis rastros digitales para descubrir quién fui, entender quién soy y reconocer en qué me he convertido.

## Estado del proyecto

**Fase actual:** conceptualización y documentación del proceso. La estructura de scrolls es una primera organización de trabajo y todavía puede cambiar. La web no se considera terminada.

El objetivo de esta entrega es hacer visible un proceso que se pueda seguir y repetir: documentar las decisiones, las iteraciones de cada scroll, las pruebas y los cambios entre diseño y desarrollo.

## Contenido del repositorio

- `index.html`, `style.css`, `script.js`: punto de partida técnico de la web.
- `contexto.md`: brief y estado del proyecto.
- `memoria.md`: decisiones estables y contexto que debe conservarse.
- `log.md`: registro cronológico de sesiones.
- `personalidad.md`, `criterio.md`, `instruction.md`: criterios de colaboración y continuidad.
- `documentacion/proceso.md`: metodología para documentar y repetir el proceso.
- `documentacion/fichas-de-scroll.md`: fichas de loop de cada scroll.
- `.github/workflows/pages.yml`: workflow preparado para publicar el sitio con GitHub Pages.

## Estructura de trabajo provisional

1. Introduction
2. Research question
3. Digital traces
4. References
5. Narrative
6. Findings
7. Project concept

Esta secuencia recoge la estructura que se ha explorado hasta ahora. No es todavía una arquitectura definitiva.

## Cómo seguir el proceso

1. Consultar `contexto.md` y `memoria.md` antes de tomar decisiones.
2. Revisar la ficha del scroll que se vaya a trabajar.
3. Registrar objetivo, contenido, interacción, transición y prueba.
4. Diseñar y probar el scroll en Figma.
5. Trasladar la iteración validada a HTML, CSS y JavaScript.
6. Anotar qué ha cambiado y por qué en `log.md`.
7. Actualizar la ficha con el resultado real, capturas y pendientes.

Consulta [el proceso y las fichas de scroll](documentacion/proceso.md).

## Publicación

El workflow de GitHub Actions está preparado para desplegar la carpeta raíz, pero la primera ejecución requiere activar GitHub Pages desde los ajustes del repositorio. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions** como fuente. Después, ejecuta manualmente el workflow **Deploy static site to GitHub Pages** desde la pestaña **Actions**.

El primer intento automático no pudo completar el paso de configuración de Pages, ya que el sitio todavía no estaba habilitado. El workflow queda ahora en modo manual para evitar ejecuciones fallidas hasta completar la configuración. La publicación solo se considerará realizada cuando el workflow termine correctamente y la URL cargue.

## Criterio de documentación

Se diferencian las decisiones **confirmadas**, las **hipótesis**, las **propuestas** y los elementos **pendientes**. No se presentan como resultados las pruebas que todavía no se han realizado.
