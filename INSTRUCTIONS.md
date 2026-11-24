# INSTRUCTIONS — Procedimiento de trabajo

Este archivo es la única guía operativa del repositorio. Contiene las instrucciones de continuidad, diseño, documentación y desarrollo; no mantener una segunda versión en otro archivo.

## 1. Lectura antes de cada sesión

Al comenzar una sesión:
1. Leer `SOUL.md` para conocer el rol y el criterio de colaboración.
2. Leer `memoria.md` para recuperar la información estable del proyecto.
3. Leer `CONTEXT.md` para consultar el brief, el alcance y el estado actual.
4. Leer `criterio.md` para aplicar prioridades y reglas de decisión.
5. Leer `log.md` para conocer los últimos cambios, decisiones y pendientes.
6. Consultar los documentos pertinentes de `documentacion/` y `project-continuity/SKILL.md` cuando el trabajo afecte al proceso o a la continuidad.

Si falta un archivo necesario, indicarlo; no afirmar que se ha leído.

## 2. Principios de trabajo

- Utilizar los documentos del repositorio como fuente de verdad para las decisiones del proyecto.
- Revisar los archivos y el código relacionados antes de modificarlos.
- Distinguir entre hechos confirmados, hipótesis, propuestas y tareas pendientes.
- No inventar requisitos, decisiones, resultados de investigación, fuentes, datos personales, capturas, pruebas ni detalles de implementación.
- Explicar los conflictos relevantes y proponer alternativas razonadas.
- Mantener los cambios acotados y evitar modificaciones ajenas a la tarea.
- Preservar el trabajo existente salvo que exista un motivo claro para cambiarlo.

## 3. Fichas del loop de cada scroll

El proceso de cada scroll se documenta en `documentacion/fichas-de-scroll.md`. Cada ficha debe recoger:

1. Objetivo y función dentro de la narración.
2. Contenido y materiales o fuentes utilizados.
3. Jerarquía visual y composición prevista.
4. Interacción o movimiento, incluyendo disparador y respuesta.
5. Entrada y salida: qué ve la persona antes y después del scroll.
6. Versión del prototipo o implementación.
7. Prueba realizada y resultado observado.
8. Cambios, motivos de las decisiones y aspectos pendientes.
9. Quién decide y quién verifica el resultado.

Ana Zhang es responsable de las decisiones finales de concepto, contenido, diseño y aceptación. ChatGPT puede ayudar a revisar claridad y coherencia, pero no sustituye el criterio de la autora ni una prueba con usuarios. La verificación externa solo se marca como realizada cuando se ha hecho y registrado una prueba real.

No marcar una prueba como completada si no se ha realizado. Añadir fechas y enlaces a frames de Figma, commits, capturas o evidencias cuando existan. Si un scroll todavía no está diseñado, mantener su ficha como propuesta.

## 4. Loop de diseño y desarrollo repetible

Para cada iteración:
1. Definir una pregunta o problema concreto.
2. Registrar el estado inicial y la hipótesis.
3. Realizar un cambio de diseño o código acotado.
4. Guardar evidencia del resultado (frame de Figma, captura, commit o nota).
5. Revisar legibilidad, jerarquía, interacción, responsive y accesibilidad según corresponda.
6. Registrar la observación y decidir si se conserva, modifica o descarta el cambio.
7. Actualizar la ficha del scroll y añadir una entrada fechada a `log.md`.

## 5. Desarrollo web

- Mantener HTML semántico, CSS organizado y JavaScript comprensible.
- Favorecer soluciones sencillas, mantenibles y compatibles con la estructura existente.
- No añadir dependencias o servicios externos sin explicar su utilidad.
- Comprobar enlaces, navegación, responsive, teclado y accesibilidad cuando corresponda.
- No afirmar que algo funciona sin haberlo comprobado.
- No presentar el prototipo como traducción fiel de Figma si no se ha contrastado con el archivo.

## 6. Cierre de sesión

Cuando se cierre una sesión:
1. Resumir el trabajo realizado.
2. Separar decisiones confirmadas de propuestas no aprobadas.
3. Enumerar archivos creados, editados o eliminados.
4. Registrar dudas, bloqueos y próximos pasos.
5. Añadir una entrada a `log.md`, conservando el historial.
6. Actualizar `memoria.md` solo si aparece información estable nueva.
7. Actualizar `CONTEXT.md` cuando cambien el brief, el alcance o el estado real.
8. Confirmar que GitHub ha guardado los cambios antes de comunicarlos como completados.

## 7. Responsabilidad de cada documento

- `SOUL.md`: rol, valores y criterio de colaboración.
- `memoria.md`: conocimiento estable del proyecto.
- `CONTEXT.md`: enunciado, objetivos, alcance, concepto y estado actual.
- `criterio.md`: prioridades y reglas para tomar decisiones.
- `log.md`: historial cronológico de sesiones.
- `INSTRUCTIONS.md`: este procedimiento operativo único.
- `documentacion/proceso.md`: metodología y reproducibilidad.
- `documentacion/fichas-de-scroll.md`: fichas del loop por scroll.
- `project-continuity/SKILL.md`: flujo complementario de continuidad.

Evitar duplicar el mismo contenido en varios documentos. Si una información tiene un documento responsable, enlazarlo en lugar de copiarlo.

## 8. Idioma e integridad

Seguir el idioma solicitado por la autora. Mantener la documentación clara y concreta. No exponer credenciales ni secretos. No eliminar ni sobrescribir archivos de proyecto sin una razón clara y autorización.
