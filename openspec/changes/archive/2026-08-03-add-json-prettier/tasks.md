## 1. Shared toast service

- [x] 1.1 Create a toast composable (e.g. `src/composables/useToast.ts`) with a module-level reactive store holding the current message and visibility, exposing a `show(message: string)` function
- [x] 1.2 Implement single-active-message + auto-dismiss-after-4s behavior, including restarting the timer when `show()` is called again while a toast is visible
- [x] 1.3 Create a `Toast.vue` host component that renders the current toast message when visible
- [x] 1.4 Mount `Toast.vue` once in `src/App.vue` as the shared toast host

## 2. JSON Prettier tool

- [x] 2.1 Create `src/tools/JsonPrettier.vue` with an input textarea, a numeric indent-width input (default `2`), a "Format" button, and a readonly output textarea, following the layout/style conventions of `ReverseString.vue`
- [x] 2.2 Implement the format action: parse input via `JSON.parse`, clamp indent width to a minimum of `0` (rejecting non-integer/negative values), and serialize with `JSON.stringify(parsed, null, indentWidth)` into the output only on click
- [x] 2.3 On parse failure (including empty input), leave the output unchanged and call the shared toast service with a message describing the error
- [x] 2.4 Add a registry entry to `src/tools.ts` (`id`, `path`, `name`, `component`) for the new tool

## 3. Verification

- [x] 3.1 Manually verify: valid JSON formats correctly at default indent 2, at a custom indent, and that invalid/empty input triggers a toast without altering existing output
- [x] 3.2 Manually verify: menu/routing shows "JSON Prettier" and navigates correctly, consistent with the existing "Reverse String" entry
- [x] 3.3 Run `vue-tsc -b` (via `npm run build`) to confirm no type errors were introduced
