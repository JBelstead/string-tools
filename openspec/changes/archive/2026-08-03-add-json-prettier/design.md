## Context

The app is a Vue 3 + vue-router single-page tool suite. A typed registry (`src/tools.ts`) is the single source of truth that both the router and the sidebar menu are generated from (see `tool-shell` spec). The only existing tool, `ReverseString.vue`, follows a simple pattern: an input textarea, an explicit action button, and an output textarea — no reactive/live formatting, no error states, no external dependencies beyond `vue`/`vue-router`.

This change adds the first tool whose primary input can be invalid (malformed JSON), which is why a shared error-signaling mechanism (toast) is introduced now rather than deferred — a one-off, tool-local error UI would not generalize to future tools that can also fail (e.g., base64 decode).

## Goals / Non-Goals

**Goals:**
- Add a "JSON Prettier" tool that pretty-prints JSON with a configurable indent width, using an explicit "Format" action (consistent with the existing Reverse String pattern).
- Introduce a minimal, reusable toast notification service that any current or future tool can use to surface a transient message, with JSON Prettier as its first consumer.
- Keep the toast service simple enough to fit the project's zero-extra-dependency, minimal-abstraction style.

**Non-Goals:**
- No JSON minification, key-sorting, or other transforms beyond pretty-printing.
- No live/reactive formatting as the user types — formatting only happens on explicit button click, matching `reverse-string-tool`.
- No toast queueing/stacking UI polish (multiple simultaneous toasts, animations) beyond showing one message at a time and letting it dismiss.
- No persistence of indent-width preference across sessions.

## Decisions

**Pretty-print via built-in `JSON.parse` / `JSON.stringify`, no dependency.**
`JSON.stringify(JSON.parse(input), null, indentWidth)` is sufficient for pretty-printing and matches the codebase's current zero-runtime-dependency footprint. A dedicated "prettier"-style library would be overkill for this scope.

**Toast service shape: a small composable + one host component mounted once in `App.vue`.**
Alternative considered: a fully tool-local toast (owned entirely inside `JsonPrettier.vue`). Rejected because a second capability (`toast-notifications`) is explicitly called out in the proposal for reuse by future tools, and `tool-shell` already owns "shared wrapper chrome" — adding one shared host there is a natural, minimal extension rather than a new architectural layer. The composable (e.g. `useToast()`) exposes a single `show(message)`-style call; internal state (current message, visibility) lives in a small reactive module-level store so any component can call it without prop drilling or provide/inject boilerplate.

**Toast behavior: single active message, auto-dismiss after a fixed delay.**
To keep scope minimal (no queueing), a new `show()` call replaces whatever toast is currently visible. The toast auto-dismisses after 4 seconds. This is enough for an error message use case without introducing dismiss-button interaction design or a multi-toast stack.

**Indent width: `<select>` with fixed options (`2`, `4`, `8`), default `2`.**
Superseded an earlier decision to use a free-form `<input type="number">` with clamping. A fixed dropdown removes the entire invalid-input surface for this control (no negative/fractional values are ever reachable), which is simpler for both the user and the implementation — no clamping logic needed. The trade-off is less flexibility (a user wanting, say, 3-space indentation can't get it), but that's an acceptable scope cut for a formatting convenience control, and it matches the layout of reference tools like jsonformatter.org.

**Invalid JSON: output is left untouched; error surfaces only via toast.**
Mirrors `reverse-string-tool`'s existing rule that output only changes on a successful explicit action ("Input changes do not update output until the button is clicked"). Extending that: a *failed* format attempt also leaves prior output untouched, and the failure is communicated out-of-band via the toast rather than by writing an error string into the output area (which could be confused for a real result).

## Risks / Trade-offs

- **[Risk]** A module-level reactive store for toast state introduces the app's first piece of cross-component shared state, a small step up in complexity from the current "everything is local component state" pattern. → **Mitigation**: keep the store minimal (message + visibility only), colocated in one small file, so it stays easy to reason about.
- **[Risk]** Auto-dismiss after 4 seconds may be too short for a user to read a longer JSON parse error message. → **Mitigation**: this is an easy constant to tune later; not worth over-designing (e.g., read-time-based duration) until real usage shows it's a problem.
- **[Risk]** A fixed 2/4/8 option set doesn't cover every indentation preference (e.g. tabs, 3 spaces). → **Mitigation**: acceptable scope cut for this tool; add an option later only if there's real demand.

## Open Questions

- None outstanding — remaining details (exact toast copy, precise clamping edge cases) are left to implementation as straightforward, low-risk choices.
