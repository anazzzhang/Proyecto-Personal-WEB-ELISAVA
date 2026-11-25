## 2026-11-25 — Rediseño editorial e interacciones de la web

### Trabajo realizado
- Se sustituyó la primera composición de la web por una versión más larga, visual y tipográfica, con una dirección monocromática en blanco, negro y grises.
- Se amplió el recorrido con secciones de pregunta, fragmento tipográfico, rastros digitales, archivo interactivo, reflexión y cierre.
- Se diseñaron composiciones abstractas en CSS para Spotify, Pinterest e Instagram: disco/ondas, collage de tarjetas y feed algorítmico. No se han utilizado imágenes personales ni datos de plataformas sin verificar.
- Se incorporó un control de modo claro/oscuro que guarda la preferencia localmente.
- Se añadieron apariciones progresivas al entrar en viewport, progreso de lectura, navegación activa y tarjetas de fragmentos desplegables.
- Se mantuvieron HTML, CSS y JavaScript separados, sin dependencias JavaScript adicionales.

### Decisiones
- La tipografía, la escala, el contraste, la retícula y el ritmo vertical pasan a ser los recursos principales de identidad visual.
- Las imágenes abstractas funcionan como material gráfico provisional; se podrán sustituir o complementar con capturas y materiales reales cuando se verifiquen y se decida qué puede publicarse.
- Se conserva el criterio de no inventar métricas personales ni presentar las plataformas como una biografía completa.
- Esta iteración es una propuesta implementada en código, no una validación final ni una traducción contrastada con los frames de Figma.

### Archivos modificados
- `index.html`: nueva estructura narrativa y elementos interactivos.
- `style.css`: sistema visual monocromático, composiciones gráficas y adaptación responsive.
- `script.js`: tema claro/oscuro, progreso, revelado de elementos, navegación activa y tarjetas interactivas.

### Pendientes
- Abrir la web publicada y revisar visualmente el resultado en escritorio y móvil.
- Comprobar el modo claro/oscuro, las tarjetas, la navegación y el comportamiento con teclado.
- Contrastar esta dirección con el Figma y ajustar la composición según los frames reales.
- Decidir qué capturas o imágenes personales se pueden incorporar con contexto y privacidad.
- Actualizar las fichas de scroll con capturas y pruebas reales; la validación externa sigue pendiente.

---

## 2026-11-25 — Consolidación de la documentación

### Trabajo realizado
- Se integraron en `SOUL.md` los contenidos complementarios de `personalidad.md` y `criterio.md`: tono, forma de colaboración, prioridades, rigor de investigación y criterios técnicos.
- Se integró en `CONTEXT.md` la información estable de `memoria.md`, evitando mantener dos documentos de contexto.
- Se consolidó el historial de sesiones en `LOG.md`; este pasa a ser el único registro cronológico.
- Se actualizó `INSTRUCTIONS.md` para que el inicio y cierre de cada sesión utilicen exclusivamente los cuatro documentos canónicos.
- Se actualizaron `README.md` y `documentacion/proceso.md` para eliminar referencias a los archivos secundarios.
- Se revisaron las fichas para retirar un bloque de decisión y verificación duplicado.

### Decisiones
- Los únicos documentos generales de continuidad son `SOUL.md`, `CONTEXT.md`, `INSTRUCTIONS.md` y `LOG.md`.
- La metodología y las fichas siguen separadas porque cumplen una función distinta y necesaria para la entrega.
- Se retiran los archivos secundarios duplicados y el antiguo Skill de continuidad, cuyo procedimiento queda incorporado en `INSTRUCTIONS.md`.

### Pendientes
- Revisar visualmente la web publicada.
- Contrastar el prototipo con Figma y completar las evidencias de las fichas.
- Preparar el PDF final con los enlaces de entrega.

---

# LOG — Registro único de sesiones

Este es el único historial cronológico del repositorio. Añadir las sesiones nuevas al principio y conservar las entradas anteriores.

## 2026-11-25 — Primer prototipo web y activación del despliegue

### Trabajo realizado
- Se sustituyó la plantilla HTML de ejemplo por una primera versión narrativa responsive de ECHOES OF WHO I WAS.
- Se desarrollaron introducción, pregunta de investigación, sección de rastros digitales y cierre provisional.
- Se añadieron navegación por anclas, indicador de progreso de lectura, estilos responsive, foco visible y respeto por prefers-reduced-motion.
- Se actualizó el workflow para desplegar automáticamente en cada push a main y conservar la ejecución manual.
- La API del repositorio informa has_pages: true. La ejecución `Deploy static site to GitHub Pages` (45506876303) terminó con `success`; el job de deploy también figura completado correctamente.

### Decisiones
- La web v0.1 es un prototipo de contenido y recorrido, no una traducción fiel del Figma todavía no revisado.
- No se incluyen datos personales concretos de Spotify, Pinterest o Instagram hasta verificarlos.
- El despliegue de GitHub Actions está completado correctamente. Falta abrir la URL pública en un navegador normal para confirmar visualmente la carga desde el dispositivo de la autora.

### Pendientes
- Verificar el resultado final de GitHub Actions y la carga de GitHub Pages.
- Contrastar composición, tipografía, ritmo y contenido con el archivo Figma real.
- Añadir capturas y pruebas de comprensión a las fichas 01 y 02.
- Generar el PDF final con enlace a la web y al repositorio.

---


## 2026-11-25 — Adaptación al enunciado actualizado

### Requisitos incorporados
- Se incorpora el checklist exacto: SOUL.md, CONTEXT.md, INSTRUCTIONS.md, LOG.md; mínimo dos fichas de scroll con decisión y verificación; web publicada en GitHub Pages; PDF final con enlace a web y repositorio.
- Se crean los cuatro documentos con los nombres solicitados, manteniendo los archivos en minúsculas como documentos de continuidad existentes.
- Se actualizan las fichas y el proceso para explicitar quién decide (Ana Zhang), qué apoyo crítico ofrece ChatGPT y quién verifica el resultado. La prueba con público externo queda pendiente hasta realizarse.
- Se identifican los scrolls 01 y 02 como trabajados a nivel conceptual. No se declaran prototipados, implementados ni validados visualmente porque todavía no hay evidencia Figma accesible en el repositorio.

### Estado y bloqueos
- La web sigue siendo una plantilla HTML/CSS/JS de ejemplo; no se ha sustituido por un diseño inventado.
- GitHub Pages: workflow completado correctamente; comprobación visual manual de la URL todavía pendiente.
- Falta exportar/compartir el diseño de Figma para registrar composición, decisiones visuales y pruebas reales.
- Falta generar el PDF final una vez que exista una URL publicada y verificada.

### Próximos pasos
1. Activar GitHub Pages en Settings → Pages → GitHub Actions.
2. Ejecutar el workflow y verificar la URL.
3. Contrastar las dos fichas con los frames reales de Figma y añadir capturas.
4. Implementar la versión web correspondiente a los scrolls trabajados.
5. Generar el PDF de entrega con los enlaces.

---


Este archivo mantiene el historial cronológico del trabajo. Añadir las entradas nuevas al principio, sin borrar ni reescribir entradas anteriores salvo corrección solicitada.

## 2026-11-24 — Preparación de GitHub Pages

### Trabajo realizado
- Se añadió el workflow `.github/workflows/pages.yml`.
- Se verificó que el push activó GitHub Actions.
- Se revisó la ejecución 1 del workflow **Deploy static site to GitHub Pages**.
- El job `build` falló en el paso **Configure GitHub Pages**; el job de despliegue quedó omitido.
- Se confirmó en los metadatos del repositorio que Pages todavía no estaba habilitado (`has_pages: false`).

### Decisiones
- Dejar el workflow en modo manual (`workflow_dispatch`) para evitar nuevas ejecuciones fallidas antes de activar Pages.
- Activar GitHub Pages desde Settings → Pages → Build and deployment → GitHub Actions.
- Después, ejecutar manualmente el workflow y comprobar la URL publicada.

### Estado
- **Workflow creado y verificado en GitHub Actions.**
- **Publicación no completada.** No se debe compartir una URL como si la web estuviera publicada hasta que el despliegue termine correctamente.

---

## 2026-11-24 — Documentación del proceso y fichas de scroll

### Objetivo
Adaptar el repositorio al enunciado de la entrega: compartir el proceso de construcción de la web, documentar el loop de cada scroll, mantenerlo en GitHub y preparar la publicación en GitHub Pages.

### Trabajo realizado
- Se ha recuperado el contexto de las conversaciones sobre el proyecto de identidad digital.
- Se ha concretado la memoria del proyecto alrededor de *ECHOES OF WHO I WAS*.
- Se ha definido una estructura provisional de siete scrolls, basada en la organización explorada en las conversaciones.
- Se ha preparado una metodología de iteración repetible y una ficha para cada scroll.
- Se ha preparado un workflow de GitHub Actions para desplegar la carpeta raíz en GitHub Pages.
- Se ha revisado el estado del repositorio y se ha comprobado que GitHub Pages todavía no estaba habilitado (`has_pages: false`).

### Decisiones confirmadas
- Mantener este repositorio como repositorio principal del proyecto web.
- Documentar el proceso aunque la web todavía no esté terminada.
- Separar decisiones confirmadas, hipótesis, propuestas y pruebas pendientes.
- No sustituir el HTML/CSS/JS de ejemplo por una web inventada ni presentar el placeholder como resultado final.

### Propuestas e hipótesis
- La secuencia Introduction / Research question / Digital traces / References / Narrative / Findings / Project concept se utiliza como mapa provisional de scrolls.
- El loop de cada scroll se registra como objetivo → contenido → diseño/interacción → prueba → observación → iteración.
- La publicación se realizará desde la rama `main` y la carpeta raíz, una vez configurado GitHub Pages con GitHub Actions.

### Archivos creados o modificados
- Actualizado `README.md`.
- Actualizado `memoria.md`.
- Actualizado `instruction.md`.
- Actualizado `log.md`.
- Creado `contexto.md`.
- Creados `documentacion/proceso.md` y `documentacion/fichas-de-scroll.md`.
- Creado `.github/workflows/pages.yml`.

### Pendientes y bloqueos
- Completar y validar el brief en `contexto.md` con el enunciado íntegro y cualquier feedback docente.
- Completar las fichas con capturas reales, enlaces a frames de Figma, decisiones visuales y pruebas de cada scroll.
- Revisar los datos personales de Spotify, Pinterest e Instagram antes de hacerlos públicos.
- Desarrollar la web real: el HTML actual sigue siendo una plantilla mínima.
- Activar GitHub Pages desde Settings → Pages → Build and deployment → GitHub Actions y verificar el primer deployment.

### Próximos pasos
1. Revisar las fichas y corregir la secuencia de scrolls según el diseño real en Figma.
2. Documentar la primera iteración visual de cada scroll con evidencia.
3. Implementar progresivamente los scrolls en HTML/CSS/JS.
4. Activar GitHub Pages y comprobar la URL publicada.
5. Registrar cada iteración y prueba en este log.

## 2026-11-04 — Configuración inicial de continuidad

### Trabajo realizado
- Se ha revisado la estructura inicial del repositorio.
- Se ha confirmado que la raíz contiene `README.md`, `index.html`, `script.js` y `style.css`.
- Se han preparado los documentos de continuidad y el Skill `project-continuity`.

### Decisiones
- Mantener la documentación de continuidad en la raíz del repositorio.
- Guardar el Skill en `project-continuity/SKILL.md` y su plantilla de registro en `project-continuity/templates/log-template.md`.
- No modificar el código existente durante esta configuración.

### Pendiente de confirmar
- El brief completo y el objetivo concreto de la web.
- Los requisitos, contenidos, público y dirección visual.
- Si hay instrucciones de la asignatura o feedback docente que deban convertirse en criterios del proyecto.

### Próximos pasos
1. Compartir el enunciado o brief de Proyecto Personal.
2. Revisar el contenido actual de `index.html`, `style.css` y `script.js` cuando se vaya a trabajar sobre la web.
3. Completar `memoria.md` con las decisiones confirmadas del proyecto.
