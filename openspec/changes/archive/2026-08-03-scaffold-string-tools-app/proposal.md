## Why

String utilities (reverse, case conversion, encoding, etc.) get reached for constantly during day-to-day work, but today that means ad-hoc scripts or reaching for a browser extension. A small, personal, UI-only web app removes that friction — and since more utilities will be added over time, the first version needs to establish a shell that makes adding a new tool a small, predictable diff rather than a redesign.

## What Changes

- New Vue 3 + TypeScript + Vite single-page app, UI-only (no backend).
- App shell: a thin wrapper component rendering a left-side menu (list of tools) and a title, with the active tool's own component rendered below it.
- vue-router wired up with one route per tool, so each tool has a bookmarkable URL.
- A manual tool registry (`tools.ts`) — a typed array of `{ id, path, name, component }` — that both the router and the sidebar menu are generated from. Adding a tool means: write its component, add one entry to the array.
- First concrete tool: **Reverse String** — a text input, a button, and the reversed output, following the button-press trigger model (not live-as-you-type).

## Capabilities

### New Capabilities
- `tool-shell`: The app's navigation shell — left-side tool menu, per-tool routing via vue-router, and the manual registry contract that both are driven from. This is the extensibility mechanism future tools plug into.
- `reverse-string-tool`: The first concrete utility — reverse a user-provided string on button press.

### Modified Capabilities
(none — greenfield project, no existing specs)

## Impact

- New project scaffold (Vue 3, TypeScript, Vite, vue-router) — no existing code affected.
- Establishes the registry contract (`tools.ts`) that every future "add a string tool" change will extend.
- No backend, no persistence, no external dependencies beyond the frontend framework stack.
