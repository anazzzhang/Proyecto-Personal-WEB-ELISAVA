# Memoria del proyecto

## Identificación
- **Repositorio:** `anazzzhang/Proyecto-Personal-WEB-ELISAVA`
- **Nombre de trabajo:** ECHOES OF WHO I WAS — A digital self-portrait
- **Asignatura:** Proyecto Personal — WEB ELISAVA
- **Autora:** Ana Zhang
- **Rama de trabajo observada:** `main`
- **Última actualización:** 2026-11-24

## Propósito
Desarrollar una web larga, visual e interactiva que explore la relación entre identidad, memoria, nostalgia y rastros digitales personales. El proyecto plantea cómo los datos y contenidos que dejamos en plataformas pueden funcionar como fragmentos de una autobiografía digital, pero también como una memoria parcial, seleccionada e influida por los algoritmos.

## Concepto y lenguaje
- **Título de trabajo:** ECHOES OF WHO I WAS.
- **Frase conceptual:** «Un viaje por mis rastros digitales para descubrir quién fui, entender quién soy y reconocer en qué me he convertido».
- **Pregunta de fondo:** cuánto de nuestro pasado digital permanece, cuánto olvidamos y cómo esos rastros influyen en la imagen que construimos de nosotros mismos.
- **Tono:** introspectivo, personal, nostálgico y crítico, sin convertir la web en una simple recopilación de estadísticas.

## Material personal identificado
- **Spotify:** historial y evolución de la escucha musical.
- **Pinterest:** rastros de intereses visuales, búsquedas y tableros.
- **Instagram:** contenidos y señales relacionadas con el algoritmo y la representación digital.

En una conversación anterior se mencionaron datos de Pinterest —2.858 pins, 35 tableros y 195 búsquedas, entre 2021 y 2026—. Antes de publicarlos, comprobar que siguen siendo exactos, que se entienden en su contexto y que la autora quiere compartirlos.

## Estructura explorada
Como primera organización del relato se han trabajado estos apartados:
1. Introduction
2. Research question
3. Digital traces
4. References
5. Narrative
6. Findings
7. Project concept

La secuencia es **provisional**: cada apartado debe evolucionar a partir de la investigación y de las pruebas de diseño.

## Formato y diseño
- Primer planteamiento visual en Figma Desktop.
- Marco de diseño inicial: 1440 × 1024 px.
- Web de recorrido vertical / página larga, articulada en scrolls.
- La interacción y el movimiento deben ayudar a leer los rastros y relacionar pasado, presente y construcción de identidad; no ser decoración sin función.

## Requisitos de la entrega
El enunciado compartido pide:
- Compartir el proceso de construcción de la web.
- Incluir fichas del loop de cada scroll.
- Mantener el material en GitHub.
- Publicar la web en GitHub Pages.
- Priorizar que el proceso se pueda seguir y repetir, no que la web esté terminada.

La documentación de proceso se encuentra en `documentacion/proceso.md` y las fichas en `documentacion/fichas-de-scroll.md`.

## Estado técnico observado el 2026-11-25
- Se ha sustituido la plantilla genérica por un primer prototipo narrativo responsive v0.1 en `index.html`, `style.css` y `script.js`.
- El prototipo contiene introducción, pregunta de investigación y tres fuentes de rastros digitales (Spotify, Pinterest e Instagram), sin incluir métricas personales no verificadas.
- El prototipo es provisional y debe contrastarse con el diseño real de Figma antes de considerarlo la versión visual definitiva.
- La API del repositorio ya informa `has_pages: true`; la activación de Pages parece estar habilitada.
- Se prepara un workflow de GitHub Actions para publicar la carpeta raíz cuando Pages se configure.
- El workflow de Actions se ha disparado tras el cambio de web; no afirmar que está publicada hasta verificar que el despliegue termina correctamente y la URL carga.

## Principios de continuidad
- Diferenciar hechos confirmados, hipótesis, propuestas y pendientes.
- No inventar datos personales, resultados, capturas, interacciones probadas ni decisiones visuales.
- Actualizar esta memoria solo con decisiones estables. El detalle cronológico pertenece a `log.md`.
