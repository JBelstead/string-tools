## Why

The tool suite currently only has "Reverse String." JSON pretty-printing is a common, low-risk utility to add next, and it introduces the first tool that can fail on bad input — which requires a shared way to surface errors (a toast) rather than solving it one-off inside a single tool.

## What Changes

- Add a new "JSON Prettier" tool: a text input, a numeric indent-width field (default `2`), an explicit "Format" button, and an output area showing the pretty-printed JSON.
- Invalid JSON input does not update the output; instead, a toast notification shows the parse error message.
- Indent width is a number input; non-positive or non-integer values are clamped to a minimum of `0` (no ability to type negative/fractional indent).
- Add a shared toast notification service (composable + a single toast host mounted in the app shell) that any tool can call to surface a transient message. JSON Prettier is its first consumer.

## Capabilities

### New Capabilities
- `json-prettier-tool`: the JSON Prettier tool itself — input, indent-width control, explicit format action, output, and its error-signaling behavior via toast.
- `toast-notifications`: a shared, app-wide toast service any tool can use to show a transient message (e.g., an error), including how messages are triggered, displayed, and dismissed.

### Modified Capabilities
- `tool-shell`: the shared wrapper chrome mounts a single toast host so tool components can trigger toasts without each tool managing its own notification UI.

## Impact

- New files: a `JsonPrettier.vue` tool component, a `tools/` registry entry, and a shared toast composable + `Toast.vue` (or similar) mounted once in `App.vue`.
- Modified files: `src/tools.ts` (new registry entry), `src/App.vue` (mount the toast host).
- No new dependencies — pretty-printing uses built-in `JSON.parse`/`JSON.stringify`.
