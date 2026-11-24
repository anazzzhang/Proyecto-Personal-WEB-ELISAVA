# Project Instructions

This file defines the working procedure for the `Proyecto-Personal-WEB-ELISAVA` repository.

## 1. Read before working

At the beginning of every work session, inspect the current repository and read these files in this order:

1. `personalidad.md` — collaboration style, role, and communication.
2. `memoria.md` — stable project information and important background.
3. `contexto.md` — current project brief, goals, scope, and status.
4. `criterio.md` — decision-making principles, priorities, and constraints.
5. `log.md` — latest session, decisions, open questions, and next steps.

Also read relevant files in `documentacion/` and `project-continuity/SKILL.md` before working on the process or continuity workflow. If an expected file is missing, report that and do not pretend it was read.

## 2. During the session

- Use repository files as the source of truth for project-specific decisions.
- Preserve existing work and inspect relevant files before editing.
- Distinguish **confirmed facts**, **hypotheses**, **proposals**, and **pending** items.
- Do not invent requirements, decisions, research findings, sources, personal data, screenshots, or implementation details.
- Explain meaningful trade-offs and flag contradictions with agreed criteria.
- Keep changes focused and avoid unrelated files.
- When editing code, consider the existing structure and visual/functional behavior of the website.

## 3. Scroll loop documentation

The assignment requires a traceable and repeatable process, including a loop sheet for every scroll. Use `documentacion/fichas-de-scroll.md` as the shared record.

For each scroll, document:
1. Purpose and role in the overall narrative.
2. Content and source/material used.
3. Intended visual hierarchy and composition.
4. Interaction or movement, including trigger and response.
5. Entry and exit: what the visitor sees before and after this scroll.
6. Prototype or implementation version.
7. Test performed and observed result.
8. What changed, why it changed, and what remains pending.

Do not mark a test as completed unless it was actually performed. Add dates and links to Figma frames, commits, screenshots, or other evidence when available. If a scroll is not designed yet, keep its sheet as a proposal rather than fabricating a finished loop.

## 4. Repeatable design-to-code loop

For each iteration:
1. Define one question or problem to solve.
2. Record the starting state and hypothesis.
3. Make one focused design or code change.
4. Capture the result (Figma frame, screenshot, commit, or short note).
5. Check readability, hierarchy, interaction, responsive behavior, and accessibility as relevant.
6. Record the observation and decide whether to keep, revise, or discard the change.
7. Update the scroll sheet and add a dated entry to `log.md`.

## 5. End-of-session procedure

When the user asks to close or finish a session:
1. Summarize work completed.
2. Record confirmed decisions and unapproved proposals separately.
3. List files created, edited, or removed.
4. Record unresolved questions, blockers, and next steps.
5. Append a dated entry to `log.md`; preserve the history.
6. Update `memoria.md` or `contexto.md` only when stable information or actual project status changes.
7. Save to GitHub only when the connected tools confirm success.

Never claim that a file was updated, a change committed, a test passed, or a website deployed unless verified.

## 6. Document responsibilities

- `personalidad.md`: collaboration style.
- `memoria.md`: stable project knowledge.
- `contexto.md`: brief, scope, and current state.
- `criterio.md`: priorities and decision principles.
- `log.md`: chronological session history.
- `instruction.md`: repository-specific operating procedure.
- `documentacion/proceso.md`: process and reproducibility.
- `documentacion/fichas-de-scroll.md`: loop sheets for every scroll.
- `project-continuity/SKILL.md`: reusable continuity workflow.

Avoid duplicating large amounts of information across documents.

## 7. Language and integrity

Follow the language requested by the user. Keep documentation clear and specific. Do not expose credentials or secrets. Do not delete or overwrite project files without a clear reason and authorization.
