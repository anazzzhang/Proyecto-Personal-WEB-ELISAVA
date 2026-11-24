# INSTRUCTIONS — Procedimiento de trabajo

Este es el único documento operativo del repositorio. No mantener instrucciones paralelas en archivos secundarios.

## 1. Inicio de cada sesión
Antes de realizar trabajo sustancial en este repositorio:
1. Leer `SOUL.md` para aplicar el criterio de colaboración, prioridades y rigor.
2. Leer `CONTEXT.md` para recuperar el brief, concepto, alcance y estado actual.
3. Leer `LOG.md` para conocer las últimas sesiones, decisiones y pendientes.
4. Consultar `documentacion/proceso.md`, `documentacion/fichas-de-scroll.md` y los archivos de código que sean relevantes para la tarea.

Si falta un archivo necesario, indicarlo; no afirmar que se ha leído. No hace falta mantener una memoria o un log duplicados.

## 2. Principios operativos
- Utilizar los documentos canónicos del repositorio como fuente de verdad.
- Revisar los archivos y el código relacionados antes de modificarlos.
- Distinguir entre hechos confirmados, hipótesis, propuestas y tareas pendientes.
- No inventar requisitos, decisiones, resultados de investigación, fuentes, datos personales, capturas, pruebas ni detalles de implementación.
- Explicar conflictos relevantes y proponer alternativas razonadas.
- Mantener los cambios acotados y preservar el trabajo existente salvo que exista un motivo claro para cambiarlo.

## 3. Fichas del loop de cada scroll
El proceso de cada scroll se documenta en `documentacion/fichas-de-scroll.md`. Cada ficha debe recoger:
1. Objetivo y función dentro de la narración.
2. Contenido y materiales o fuentes utilizados.
3. Jerarquía visual y composición.
4. Interacción o movimiento, con disparador y respuesta.
5. Entrada y salida: qué ve la persona antes y después.
6. Versión del prototipo o implementación.
7. Prueba realizada y resultado observado.
8. Cambios, motivos de las decisiones y aspectos pendientes.
9. Quién decide y quién verifica el resultado.

Ana Zhang decide concepto, contenido, diseño y aceptación. ChatGPT puede revisar claridad y coherencia, pero no sustituye el criterio de la autora ni una prueba con usuarios. La verificación externa solo se marca como realizada cuando se ha hecho y registrado una prueba real.

No marcar una prueba como completada si no se ha realizado. Añadir fechas y enlaces a frames de Figma, commits, capturas o evidencias cuando existan. Si un scroll todavía no está diseñado, mantener su ficha como propuesta.

## 4. Loop de diseño y desarrollo repetible
Para cada iteración:
1. Definir una pregunta o problema concreto.
2. Registrar el estado inicial y la hipótesis.
3. Realizar un cambio de diseño o código acotado.
4. Guardar evidencia del resultado (frame de Figma, captura, commit o nota).
5. Revisar legibilidad, jerarquía, interacción, responsive y accesibilidad según corresponda.
6. Registrar la observación y decidir si se conserva, modifica o descarta el cambio.
7. Actualizar la ficha del scroll y añadir una entrada fechada a `LOG.md`.

## 5. Desarrollo web
- Mantener HTML semántico, CSS organizado y JavaScript comprensible.
- Favorecer soluciones sencillas, mantenibles y compatibles con la estructura existente.
- No añadir dependencias o servicios externos sin explicar su utilidad.
- Comprobar enlaces, navegación, responsive, teclado y accesibilidad cuando corresponda.
- No afirmar que algo funciona sin haberlo comprobado.
- No presentar el prototipo como traducción fiel de Figma si no se ha contrastado con el archivo.

## 6. Cierre de sesión
Al cerrar una sesión o completar una fase de trabajo:
1. Resumir el trabajo realizado.
2. Separar decisiones confirmadas de propuestas no aprobadas.
3. Enumerar archivos creados, editados o eliminados.
4. Registrar dudas, bloqueos y próximos pasos concretos.
5. Añadir una entrada fechada al principio de `LOG.md`, conservando el historial anterior.
6. Actualizar `CONTEXT.md` solo cuando cambien el brief, el alcance o el estado real del proyecto.
7. Confirmar que GitHub ha guardado los cambios antes de comunicarlos como completados.

## 7. Responsabilidad de cada documento
- `SOUL.md`: rol, tono, valores, prioridades y criterios de colaboración.
- `CONTEXT.md`: brief, objetivo, concepto, materiales, estructura y estado del proyecto.
- `INSTRUCTIONS.md`: este procedimiento operativo único.
- `LOG.md`: historial cronológico de sesiones.
- `documentacion/proceso.md`: metodología y reproducibilidad del proceso.
- `documentacion/fichas-de-scroll.md`: fichas del loop por scroll.

## 8. Idioma e integridad
Seguir el idioma solicitado por la autora. Mantener la documentación clara y concreta. No exponer credenciales ni secretos. No eliminar ni sobrescribir archivos de proyecto sin una razón clara y autorización.
