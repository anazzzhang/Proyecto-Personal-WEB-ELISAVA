---
name: project-continuity
description: Mantiene la continuidad de trabajo entre sesiones en repositorios de proyectos. Lee los documentos de contexto al empezar, sigue los criterios del proyecto y registra avances y decisiones al cerrar.
---

# Project Continuity

## Objetivo
Mantener una continuidad fiable entre sesiones de trabajo en un repositorio, evitando que se pierdan decisiones, contexto, tareas pendientes y acuerdos.

## Cuándo activarlo
Activa este flujo cuando la usuaria diga, por ejemplo:
- «Iniciar sesión»
- «Activar proyecto»
- «Continuar con el proyecto»
- «Cerrar sesión»
- «Actualizar el log»

También debe aplicarse cuando se retome trabajo sustancial en este repositorio, aunque no se utilice literalmente una de esas frases.

## Identificación del proyecto
1. Confirma qué repositorio y rama se están utilizando.
2. Si el repositorio no está claro, pregunta antes de leer o modificar archivos.
3. No asumas que dos repositorios con nombres parecidos son el mismo proyecto.

## Inicio de sesión
Antes de empezar una nueva sesión:
1. Lee `personalidad.md`.
2. Lee `memoria.md`.
3. Lee `criterio.md`.
4. Lee `log.md`.
5. Revisa los archivos de trabajo que sean relevantes para la tarea actual.
6. Resume brevemente el estado, las últimas decisiones y los siguientes pasos solo si ayuda a retomar el trabajo.

Si alguno de estos archivos no existe o no está accesible, indícalo y continúa con la información disponible. No inventes su contenido.

## Durante la sesión
- Sigue las instrucciones de `personalidad.md` y `criterio.md`.
- Usa `memoria.md` como referencia de contexto estable.
- Consulta el historial de `log.md` para evitar repetir trabajo o contradecir decisiones previas.
- Distingue explícitamente hechos confirmados, hipótesis, propuestas y cuestiones pendientes.
- Registra mentalmente los cambios realizados, decisiones aprobadas, fuentes consultadas y tareas abiertas para documentarlos al cierre.
- No cambies decisiones anteriores de forma silenciosa. Si una decisión necesita revisarse, explica por qué y registra el cambio.
- No modifiques archivos fuera del alcance de la tarea.

## Cierre de sesión
Cuando la usuaria solicite cerrar la sesión, o cuando se complete una fase de trabajo y sea apropiado registrar el avance:
1. Resume brevemente el trabajo realizado.
2. Identifica decisiones confirmadas y propuestas aún no aprobadas.
3. Registra los archivos creados o modificados.
4. Anota dudas, bloqueos y tareas pendientes.
5. Define próximos pasos concretos.
6. Añade una nueva entrada fechada al principio de `log.md`, conservando el historial anterior.
7. Actualiza `memoria.md` solo si ha aparecido información estable y relevante para futuras sesiones.
8. Guarda los cambios en el repositorio con un mensaje de commit descriptivo.
9. Confirma qué archivos se han actualizado y enlaza a ellos.

## Formato de entrada del log
Usa la plantilla de `templates/log-template.md`. Cada entrada debe incluir:
- Fecha y título de la sesión.
- Objetivo.
- Trabajo realizado.
- Decisiones confirmadas.
- Propuestas o hipótesis.
- Archivos modificados.
- Pendientes y bloqueos.
- Próximos pasos.

## Reglas de seguridad y fiabilidad
- Nunca afirmes que has leído, editado, guardado o probado algo si no lo has hecho y verificado.
- Nunca inventes decisiones, sesiones, fuentes ni resultados.
- No borres el historial del log.
- No reemplaces archivos existentes sin leerlos primero y comprobar qué contienen.
- Si GitHub no está disponible o no tienes permisos, explica la limitación y ofrece el contenido preparado sin fingir que se ha guardado.
- Antes de crear un archivo, comprueba que no exista. Si ya existe, no lo sobrescribas: léelo y decide si corresponde proponer una actualización.
- Pide confirmación antes de cambios destructivos, cambios de alcance amplio o decisiones irreversibles.

## Alcance
Este Skill es reutilizable en distintos proyectos. Adapta el trabajo al contexto real del repositorio y a sus documentos; no presupongas que todos los proyectos son de diseño o desarrollo web.
