# Fichas de loop — ECHOES OF WHO I WAS

Las fichas siguientes convierten la estructura narrativa explorada en un proceso que se puede seguir y repetir. Los siete scrolls son una **propuesta de organización**; los scrolls 01 y 02 se consideran trabajados a nivel de conceptualización y estructura narrativa, pero su diseño visual en Figma y sus pruebas de uso siguen pendientes. No se afirma que estén implementados ni validados visualmente.

Completar cada apartado con evidencia real del proceso. No marcar pruebas, decisiones visuales ni interacciones como realizadas hasta haberlas llevado a cabo.

## Cómo leer cada ficha

- **Estado:** propuesta / en diseño / prototipo / implementado / probado.
- **Objetivo:** función narrativa del scroll.
- **Contenido:** información, materiales y fuentes.
- **Entrada y salida:** relación con los scrolls vecinos.
- **Loop:** pregunta → hipótesis → cambio → prueba → observación → decisión.
- **Evidencia:** enlace a Figma, captura, vídeo, commit o resultado de prueba.
- **Quién decide:** Ana Zhang, autora del proyecto, conserva la decisión final de concepto, contenido, diseño y aceptación.
- **Quién verifica:** revisión crítica de ChatGPT para detectar incoherencias y comprobar que la ficha responde al brief; la autora contrasta la revisión con su intención. La legibilidad y comprensión con público real solo se consideran verificadas cuando se realiza una prueba con otra persona y se registra su resultado.
- **Pendientes:** aquello que falta por decidir o comprobar.

---

## Scroll 01 — Introduction

**Estado:** trabajado en conceptualización; prototipo visual y prueba pendientes.

### Objetivo
Presentar el universo del proyecto y abrir la pregunta sobre la relación entre identidad, memoria y huella digital.

### Contenido previsto
- Título *ECHOES OF WHO I WAS*.
- Subtítulo *A digital self-portrait*.
- Frase conceptual: «Un viaje por mis rastros digitales para descubrir quién fui, entender quién soy y reconocer en qué me he convertido».
- Una introducción breve que invite a recorrer el archivo personal.

### Entrada y salida
- **Entrada:** inicio de la página; no requiere contexto previo.
- **Salida:** despertar curiosidad y conducir a la pregunta de investigación.

### Loop de diseño
1. ¿Cómo presentar una reflexión íntima sin explicar todo desde el primer pantallazo?
2. Hipótesis: una portada contenida y una frase evocadora pueden crear una entrada más abierta.
3. Probar jerarquía entre título, subtítulo y frase.
4. Revisar legibilidad, escala, ritmo y llamada al scroll.
5. Registrar qué elemento guía mejor la entrada.


### Decisión y verificación
- **Decide:** Ana Zhang. Se reserva la decisión final sobre el tono, la jerarquía, la redacción y la composición.
- **Apoya la revisión:** ChatGPT puede señalar problemas de claridad, coherencia narrativa y correspondencia con el enunciado; no sustituye la decisión de la autora.
- **Verifica el resultado:** primero, Ana revisa que la propuesta represente su intención. Después, una persona externa debe comprobar si entiende el propósito del scroll y cómo continuar. Esta segunda verificación está **pendiente** hasta realizar y registrar una prueba real.
- **Evidencia disponible:** decisiones y contenido conceptual recogidos en conversaciones de trabajo y en CONTEXT.md; no existe todavía un enlace a un frame Figma ni una captura validada en este repositorio.

### Evidencia
- Figma: pendiente.
- Captura antes/después: pendiente.
- Prueba de navegación: pendiente.
- Commit de implementación: pendiente.

### Pendientes
- Definir composición, tipografía, imagen o recurso gráfico y transición al scroll 02.

---

## Scroll 02 — Research question

**Estado:** trabajado en conceptualización; prototipo visual y prueba pendientes.

### Objetivo
Formular la pregunta central y explicar por qué mirar los rastros digitales puede revelar aspectos de una identidad cambiante.

### Contenido previsto
- Pregunta de investigación, todavía por cerrar.
- Breve contexto sobre memoria selectiva y huella digital.
- Relación entre pasado, presente y representación de uno mismo.

### Entrada y salida
- **Entrada:** prolonga la curiosidad planteada en la introducción.
- **Salida:** introduce los rastros concretos que se observarán.

### Loop de diseño
1. ¿Cómo convertir una pregunta abstracta en una sección clara y visual?
2. Hipótesis: una pregunta dominante acompañada de pocas ideas clave facilita la lectura.
3. Probar distintas jerarquías y formas de revelar el texto.
4. Comprobar si la pregunta se entiende sin explicaciones adicionales.
5. Registrar qué formulación y composición resultan más precisas.

### Evidencia
- Figma: pendiente.
- Captura antes/después: pendiente.
- Prueba de comprensión: pendiente.
- Commit de implementación: pendiente.

### Pendientes
- Cerrar la pregunta de investigación y verificar el contexto teórico que la acompaña.

---

## Scroll 03 — Digital traces

**Estado:** implementado en código con datos reales (v0.5, rama `datos-reales`); revisión de la autora y prueba externa pendientes.

### Iteración v0.6 — gráficos interactivos (2026-11-27)
- **Pregunta:** ¿cómo hacer que los datos se exploren en vez de solo leerse?
- **Cambio:** río de artistas (horas / % del mes, leyenda que aísla), mapa de calor hora × año, marca «sigue / en silencio» por artista, filtro de *daylists*, pines por mes con pico anotado, vida de cada tablero y múltiplos pequeños de Instagram. Títulos de plataforma del documento maestro.
- **Prueba:** renderizado en escritorio, móvil y modo oscuro sin errores; interacciones comprobadas con cursor simulado.
- **Pendiente:** revisión de Ana y prueba externa (¿se entiende el río sin explicación?).

### Iteración v0.5 — datos reales (2026-11-27)
- **Pregunta:** ¿cómo enseñar los rastros reales sin convertir la web en un dashboard?
- **Hipótesis:** si cada plataforma responde a un verbo (escuchar, guardar, mirar) y cada dato se presenta como un fragmento con una frase, se lee como memoria y no como estadística.
- **Cambio:** tres subscrolls nuevos: 02.1 Spotify (`#sound`), 02.2 Pinterest (`#images`) y 02.3 Instagram (`#feed`). Los datos salen de las exportaciones oficiales mediante `herramientas/procesar_datos.py`, que solo escribe agregados en `data/echoes-data.js`.
- **Contenido:** horas por año y artista principal; escucha nocturna; artista constante (calculado); canciones abandonadas antes de junio de 2024; nombres de *daylist* generados por Spotify; pines por año y tableros por fecha de creación; publicaciones propias frente a actividad registrada; hashtags de los guardados; cuentas seguidas por año.
- **Interacción:** selector de años con teclado (flechas); canciones olvidadas desenfocadas que recuperan nitidez al pasar el cursor o tocar; botón «otra versión de mí» que cambia el nombre de la *daylist*; tableros numerados desenfocados frente a tableros con nombre.
- **Privacidad:** no se publican mensajes, contactos, usuarios de terceros, IP, ubicaciones, búsquedas de Pinterest ni categorías publicitarias personales. Las exportaciones en bruto no se suben (`.gitignore`).
- **Prueba realizada:** renderizado en Chrome sin interfaz a 1440 px (claro y oscuro) y 390 px. Sin errores de JavaScript. Se corrigieron: formato de miles en números de cuatro cifras, barras de artistas que no se dibujaban, «0 %» de canciones saltadas en 2021 (el dato no existe ese año, ahora se muestra «—») y textos que no cabían en tableros pequeños en móvil.
- **Evidencia:** capturas de la sesión; commit en la rama `datos-reales`.
- **Pendiente:** revisión de Ana (tono de los textos, qué datos se publican), contraste con Figma y prueba con una persona externa.

### Objetivo
Presentar las plataformas como archivos parciales de intereses, hábitos y comportamientos a lo largo del tiempo.

### Contenido previsto
- Spotify: historial y evolución de las escuchas.
- Pinterest: tableros, pins y búsquedas.
- Instagram: contenidos y señales de selección algorítmica.
- Datos, fechas, capturas o ejemplos que se decida compartir.

### Entrada y salida
- **Entrada:** la pregunta de investigación se concreta en tres fuentes personales.
- **Salida:** los rastros se convierten en material para construir una narración.

### Loop de diseño
1. ¿Cómo mostrar datos de plataformas sin convertir la web en un dashboard?
2. Hipótesis: tratar cada plataforma como un fragmento de memoria permite relacionar datos y significado personal.
3. Probar una composición diferenciada para cada fuente, manteniendo un sistema común.
4. Revisar contexto, privacidad, legibilidad y relación entre dato e interpretación.
5. Registrar qué visualización ayuda a entender mejor el paso del tiempo.

### Evidencia
- Figma: pendiente.
- Capturas o datos verificados: pendientes.
- Prueba de lectura: pendiente.
- Commit de implementación: pendiente.

### Pendientes
- Verificar todos los datos antes de publicarlos.
- Decidir qué información personal puede compartirse públicamente.
- Definir cómo se representará cada plataforma.

---

## Scroll 04 — References

**Estado:** propuesta.

### Objetivo
Situar la investigación y hacer visibles las referencias que ayudan a pensar la memoria, la identidad, los archivos y la cultura digital.

### Contenido previsto
- Referencias visuales, teóricas y digitales.
- Autoría, título, fecha y enlace de cada fuente.
- Nota breve sobre qué aporta cada referencia al proyecto.

### Entrada y salida
- **Entrada:** conecta la experiencia personal con un marco más amplio.
- **Salida:** aporta herramientas para ordenar el relato y las interpretaciones.

### Loop de diseño
1. ¿Cómo presentar referencias sin interrumpir el ritmo de la narración?
2. Hipótesis: una selección editorial con anotaciones breves muestra mejor la relación entre referencia y proyecto.
3. Probar formatos de ficha, índice o archivo visual.
4. Comprobar atribución, lectura y utilidad de cada referencia.
5. Registrar qué formato permite consultar y relacionar las fuentes.

### Evidencia
- Selección de fuentes verificadas: pendiente.
- Figma: pendiente.
- Captura y prueba: pendientes.

### Pendientes
- Cerrar una selección de referencias relevantes y verificar datos bibliográficos y enlaces.

---

## Scroll 05 — Narrative

**Estado:** propuesta.

### Objetivo
Organizar los rastros como un recorrido autobiográfico, conectando fragmentos de diferentes momentos en lugar de mostrarlos como elementos aislados.

### Contenido previsto
- Secuencia temporal o temática de fragmentos.
- Relaciones entre gustos, intereses y cambios.
- Contraste entre lo que una plataforma conserva y lo que la memoria personal recuerda.

### Entrada y salida
- **Entrada:** parte de los materiales y referencias presentados.
- **Salida:** prepara la lectura de patrones y observaciones.

### Loop de diseño
1. ¿Qué estructura permite percibir el cambio y no solo acumular recuerdos?
2. Hipótesis: una secuencia de fragmentos relacionados puede hacer visible una evolución.
3. Probar orden cronológico, asociaciones temáticas u otra estructura.
4. Revisar ritmo, continuidad y claridad de las relaciones.
5. Registrar qué organización construye una historia comprensible sin forzar conclusiones.

### Evidencia
- Guion narrativo: pendiente.
- Figma: pendiente.
- Prueba de recorrido: pendiente.

### Pendientes
- Seleccionar los fragmentos reales y decidir el criterio de orden.

---

## Scroll 06 — Findings

**Estado:** primer hallazgo implementado en código (v0.5, sección «03 / Ecos»); revisión pendiente.

### Iteración v0.5 — «Un mismo nombre en tres archivos» (2026-11-27)
- **Observación:** BTS es el único artista que está en el top 3 de Spotify todos los años (2021–2026), y la primera canción del archivo es «Butter». La misma presencia aparece en Instagram (guardados con etiquetas de BTS o Jungkook) y en Pinterest (búsquedas con su nombre).
- **Cambio:** sección `#echo` con tres tarjetas, una por plataforma. Las cifras se calculan en el script, no se escriben a mano.
- **Hipótesis por validar:** que un hallazgo repetido en las tres plataformas comunica mejor la idea de eco que una lista de estadísticas.
- **Pendiente:** confirmar con la autora que quiere este hallazgo como eje y redactar los demás hallazgos.

### Objetivo
Compartir qué patrones, contradicciones o cambios aparecen al observar los rastros digitales junto con la memoria actual.

### Contenido previsto
- Observaciones derivadas de los datos personales verificados.
- Cambios de intereses o hábitos.
- Coincidencias y diferencias entre plataformas y recuerdos.
- Límites de lo que los datos permiten afirmar.

### Entrada y salida
- **Entrada:** recoge los fragmentos organizados en la narrativa.
- **Salida:** conduce a la síntesis conceptual del proyecto.

### Loop de diseño
1. ¿Cómo presentar hallazgos personales sin convertir interpretaciones en hechos?
2. Hipótesis: separar dato, observación e interpretación hace el relato más honesto.
3. Probar recursos de comparación, anotación o síntesis.
4. Comprobar que cada afirmación se apoya en un dato o experiencia identificable.
5. Registrar qué conclusiones se sostienen y cuáles deben quedar abiertas.

### Evidencia
- Datos y observaciones contrastados: pendientes.
- Figma: pendiente.
- Revisión de contenido: pendiente.

### Pendientes
- Completar el análisis real y distinguir con claridad dato, interpretación e hipótesis.

---

## Scroll 07 — Project concept

**Estado:** propuesta.

### Objetivo
Cerrar el recorrido con una síntesis sobre cómo los rastros digitales pueden funcionar como ecos de versiones anteriores de nosotros mismos.

### Contenido previsto
- Síntesis de la reflexión.
- Relación entre memoria, identidad y algoritmos.
- Cierre abierto que invite a reconsiderar los propios rastros digitales.

### Entrada y salida
- **Entrada:** recoge las observaciones del recorrido.
- **Salida:** final de la experiencia; puede dejar una pregunta al visitante.

### Loop de diseño
1. ¿Cómo cerrar sin presentar la identidad como algo fijo o completamente explicable?
2. Hipótesis: un cierre abierto conecta la experiencia personal con la reflexión del visitante.
3. Probar una síntesis breve y una salida visual coherente con la introducción.
4. Revisar si el cierre recoge el concepto sin repetir todo el contenido.
5. Registrar qué relación se establece entre inicio y final.

### Evidencia
- Figma: pendiente.
- Captura antes/después: pendiente.
- Prueba de recorrido completo: pendiente.

### Pendientes
- Redactar el cierre definitivo y comprobar la continuidad visual con el scroll 01.

---

## Registro de iteraciones

Añadir una línea cada vez que se complete una vuelta de trabajo. Mantener los enlaces a las evidencias.

| Fecha | Scroll | Pregunta / cambio | Evidencia | Observación y decisión |
|---|---|---|---|---|
| 2026-11-24 | 01–07 | Creación de la estructura inicial de fichas | Este documento | Fichas creadas como propuestas; falta contrastarlas con Figma |
| 2026-11-25 | 01 | Desarrollo conceptual de la introducción y definición de responsabilidades | CONTEXT.md; conversaciones de trabajo | Trabajo conceptual documentado. Sin frame/captura ni test de comprensión; verificación externa pendiente |
| 2026-11-25 | 02 | Desarrollo conceptual de la pregunta de investigación y su función narrativa | CONTEXT.md; conversaciones de trabajo | Trabajo conceptual documentado. La pregunta definitiva y su legibilidad visual siguen pendientes |
| 2026-11-25 | 01, 03 y archivo | Luz ambiental que sigue el cursor y desenfoque selectivo de elementos gráficos para representar el olvido | Commit `6b1418e`; `db04197`; `524d923` | Interacción implementada en código; falta revisar intensidad, legibilidad y comportamiento real en escritorio/móvil. No equivale a validación de uso |
| 2026-11-27 | 03 y 06 | Incorporación de datos reales de Spotify, Pinterest e Instagram y primer hallazgo «Ecos» | Rama `datos-reales`; `herramientas/procesar_datos.py`; capturas de la sesión | Implementado y renderizado en escritorio, móvil y modo oscuro sin errores. Falta revisión de la autora y prueba externa |
| 2026-11-27 | 02, 03, 05 y 06 | Estructura en cuatro momentos (documento maestro), gráficos interactivos y sección «Reconstrucción» con selector de año | `documentacion/documento-maestro.md`; commit v0.6 | Implementado y renderizado sin errores; revisión de la autora y prueba externa pendientes |
