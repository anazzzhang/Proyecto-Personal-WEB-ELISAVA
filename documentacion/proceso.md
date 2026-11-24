# Proceso de construcción de la web

Este documento explica cómo se construye *ECHOES OF WHO I WAS* y cómo repetir el proceso en cada scroll. La entrega no depende de que la web esté terminada: el objetivo es que el recorrido de decisiones, pruebas e iteraciones sea visible.

## 1. Punto de partida

La web explora la identidad personal a través de rastros digitales de Spotify, Pinterest e Instagram. El recorrido se plantea como una narración visual y editorial sobre memoria, nostalgia, cambios de gustos y selección algorítmica.

El concepto, la estructura provisional y el estado actual están descritos en [contexto.md](../contexto.md).

## 2. Organización del proyecto

| Archivo | Función |
|---|---|
| `contexto.md` | Brief, objetivo, preguntas y estado actual |
| `memoria.md` | Decisiones estables del proyecto |
| `log.md` | Historial cronológico de sesiones |
| `documentacion/fichas-de-scroll.md` | Loop de diseño y construcción de cada scroll |
| `index.html` | Estructura y contenido semántico |
| `style.css` | Sistema visual, composición y responsive |
| `script.js` | Interacciones y comportamiento |
| `.github/workflows/pages.yml` | Publicación mediante GitHub Pages |

## 3. Responsabilidades: quién decide y quién verifica

- **Autora / responsable de decisión — Ana Zhang:** decide el concepto, los contenidos, la dirección visual, las interacciones y si una iteración se acepta, se revisa o se descarta. La decisión final siempre es suya.
- **Asistencia crítica — ChatGPT:** ayuda a ordenar el proceso, detectar contradicciones, revisar claridad y proponer alternativas. No valida por sí solo la experiencia ni toma decisiones en nombre de la autora.
- **Verificación de diseño y contenido — Ana Zhang:** contrasta el resultado con el objetivo del scroll, la intención del proyecto y los criterios de accesibilidad y legibilidad.
- **Verificación de comprensión — persona externa / compañera o compañero:** cuando se realice una prueba, observa si alguien que no ha diseñado el scroll entiende el mensaje y puede recorrerlo. Se registra quién participó (con permiso), qué tarea hizo y qué ocurrió. Hasta entonces se indica «pendiente».
- **Verificación técnica — navegador y GitHub Actions:** se comprueba la carga, enlaces, responsive e interacciones en el navegador; GitHub Actions verifica el despliegue. No se marca como correcto sin resultado observable.

## 4. Método: un loop por scroll

Cada scroll se trabaja como una unidad con una intención narrativa concreta. El ciclo no consiste solo en diseñar y programar: también hay que formular qué se quiere comprobar y registrar el resultado.

1. **Observar:** revisar el contenido, los materiales y el punto anterior del recorrido.
2. **Definir:** escribir qué función cumple el scroll y qué debe comprender o sentir el visitante.
3. **Proponer:** decidir una jerarquía, composición y posible interacción.
4. **Prototipar:** construir la versión en Figma.
5. **Probar:** revisar lectura, ritmo, navegación, interacción y adaptación a pantalla.
6. **Evaluar:** anotar qué funciona, qué no y qué evidencia lo demuestra.
7. **Iterar:** conservar, modificar o descartar la propuesta y explicar el motivo.
8. **Implementar:** trasladar la versión decidida a HTML, CSS y JavaScript.
9. **Registrar:** actualizar la ficha del scroll y añadir el cambio a `log.md`.

### Plantilla breve para cada vuelta

- **Pregunta:** ¿qué quiero comprobar?
- **Hipótesis:** ¿qué creo que ocurrirá?
- **Cambio:** ¿qué he modificado?
- **Evidencia:** ¿qué frame, captura, prueba o commit lo demuestra?
- **Observación:** ¿qué ha ocurrido?
- **Decisión:** ¿mantengo, reviso o descarto?
- **Siguiente paso:** ¿qué falta?

## 5. Del diseño al código

Para que el proceso sea repetible, cada scroll debe tener una correspondencia clara entre prototipo y código.

- Mantener nombres coherentes para las secciones y componentes.
- Usar HTML semántico para identificar las secciones.
- Separar estructura, estilos e interacciones.
- Registrar cambios de composición, tipografía, color, movimiento o contenido.
- Comprobar la experiencia en diferentes anchuras y con navegación por teclado cuando corresponda.
- No añadir una interacción si no aporta sentido al relato o a la comprensión.

## 6. Evidencias que conviene guardar

En cada iteración, incorporar cuando existan:
- Captura del estado anterior y posterior.
- Enlace al frame o página de Figma.
- Nota breve sobre el cambio y su motivo.
- Captura o grabación de la interacción.
- Resultado de una prueba de lectura o navegación.
- Enlace al commit que contiene la implementación.

Las evidencias deben ser reales y estar fechadas. Si todavía no existen, dejar el campo como pendiente.

## 7. Cómo mantener la trazabilidad en GitHub

- Hacer commits pequeños y descriptivos, relacionados con una mejora concreta.
- Actualizar la ficha del scroll en la misma fase en que se realiza el cambio.
- Añadir al `log.md` una entrada con objetivo, trabajo, decisiones, archivos y próximos pasos.
- No borrar iteraciones anteriores: explicar qué cambió y por qué.
- Diferenciar decisiones confirmadas de propuestas y pruebas pendientes.

Ejemplos de mensajes de commit:
- `docs: define loop for introduction scroll`
- `design: revise hierarchy in digital traces`
- `feat: add scroll transition for spotify section`
- `fix: improve keyboard navigation in references`

## 8. Publicación en GitHub Pages

El workflow `.github/workflows/pages.yml` está preparado para publicar el contenido de la carpeta raíz. La primera activación debe hacerse una sola vez:

1. Abrir el repositorio en GitHub.
2. Ir a **Settings → Pages**.
3. En **Build and deployment**, seleccionar **GitHub Actions** como fuente.
4. Abrir la pestaña **Actions**.
5. Ejecutar manualmente **Deploy static site to GitHub Pages** mediante **Run workflow**.
6. Comprobar que el workflow termina correctamente.
7. Abrir la URL que GitHub Pages muestre en Settings → Pages.
8. Verificar que la web carga y que los recursos enlazados funcionan.

**Estado actual:** el primer intento de configuración falló porque GitHub Pages aún no estaba habilitado en el repositorio. El workflow se ha dejado en ejecución manual para no repetir el fallo hasta completar el paso de Settings. La publicación no se considera completada hasta verificar el despliegue y la URL.

## 9. Criterio de cierre de un scroll

Un scroll puede considerarse documentado cuando su ficha explica su objetivo, contenido, entrada y salida, propuesta visual, interacción, iteraciones y estado real. Puede seguir pendiente de desarrollo o de validación: no es necesario fingir que está terminado.

Un scroll puede pasar a implementación cuando:
- su contenido tiene una intención clara;
- la jerarquía se entiende;
- la interacción está justificada;
- existe una versión de prototipo que se puede revisar;
- los pendientes están identificados.

## 10. Estado y próximos pasos

La estructura de siete scrolls es provisional. El siguiente paso es contrastarla con el diseño real en Figma, añadir capturas y completar cada ficha con decisiones visuales específicas. Después se implementarán y probarán progresivamente los scrolls.
