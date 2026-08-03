## Context

Greenfield project (no existing code). Decided during an explore session before this change existed — see decisions below for the alternatives that were weighed and rejected. The app is UI-only, personal-use, single user, no backend — so choices lean toward simplicity and low ceremony over robustness features a multi-user/production app would need.

## Goals / Non-Goals

**Goals:**
- Establish a tool shell (menu + routing + registry) that makes adding the *next* string tool a small, obvious diff.
- Ship the first real tool (Reverse String) through that shell end-to-end.
- Keep the registry contract typed and explicit so a missing/mistyped field is a compile error, not a runtime surprise.

**Non-Goals:**
- No backend, no persistence, no auth — everything is client-side and stateless across reloads.
- No generic "one-size-fits-all" tool component — each tool owns its full UI (decided explicitly; see Decisions).
- No auto-discovery/convention-based registration — registry entries are added by hand.
- Search/filter over the tool list — deferred until the list is long enough to need it.

## Decisions

### Each tool owns its full component (not a generic input/output shell)
A generic `(input) => output` shell was considered so simple tools would need zero component code. Rejected because future tools won't all be single-string-in/single-string-out (e.g. find-and-replace needs two fields, a UUID generator needs none), and forcing everything through one shape now just to special-case it later isn't worth it. Every tool gets its own `.vue` component under `src/tools/`.

### Manual registry over auto-discovery
Considered using `import.meta.glob` to auto-discover tool components by folder convention, so adding a tool needs zero registration edits. Rejected in favor of an explicit `tools.ts` array — for a single-maintainer project, an at-a-glance list of every tool in one file was preferred over the implicit "magic" of glob-based discovery. Adding a tool costs one array entry; that's an acceptable, deliberate cost.

### Thin shared wrapper (menu + title), not a rigid content contract
The wrapper (`App.vue`) owns the left-side tool menu and renders the active tool's name as a title, but does not dictate what a tool renders below that — it's a layout slot, not a shell that shapes input/output. This gives visual consistency (menu, spacing, title) without re-introducing the generic-shell constraint that was already rejected.

### vue-router, one route per tool
Each registry entry maps to a route (e.g. `/reverse-string`), generated from the registry rather than declared separately, so the registry stays the single source of truth for "what tools exist" (drives menu, routing, and title all from one array). Chosen over keeping the active tool in a plain in-memory ref so tools are bookmarkable/shareable and survive a refresh via the URL.

### Button-press trigger, not live-as-you-type
Reverse String (and the pattern future tools should default to, though each tool owns this choice independently since there's no shared shell enforcing it) transforms on an explicit button click rather than reactively on every keystroke. This was a deliberate choice over live-update, made during exploration.

### TypeScript
The registry is a real contract (`{ id, path, name, component }`) that every future change will extend. A `StringTool` interface makes a missing/misspelled field a compile-time error instead of a silent runtime gap in the menu or router.

## Risks / Trade-offs

- **[Manual registry drifts from routes if hand-edited carelessly]** → Router config is generated *from* `tools.ts`, not maintained separately, so there is only one place to add an entry — reduces the chance of drift to typos within a single array literal.
- **[No shared input/output contract means inconsistent UX across tools over time]** → Mitigated by the thin wrapper providing consistent menu/title chrome; acceptable trade-off for the flexibility of full component ownership.
- **[No tests specified yet for the registry/router wiring]** → Reverse String's transform is a pure function and trivially unit-testable; shell wiring (menu renders all registry entries, routes resolve) is small enough to verify manually for v1.

## Migration Plan

N/A — greenfield scaffold, no existing users or data to migrate.

## Open Questions

- Styling approach (plain CSS vs. Tailwind) — left to implementation, doesn't affect this design.
- Deployment target (e.g. GitHub Pages) — out of scope for this change; app runs via `vite dev`/`vite build` regardless of where it's eventually hosted.
