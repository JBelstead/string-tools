## 1. Project Scaffold

- [x] 1.1 Scaffold a Vue 3 + TypeScript project with Vite (`npm create vite@latest . -- --template vue-ts`)
- [x] 1.2 Add and configure vue-router (`vue-router@4`)
- [x] 1.3 Set up base project scripts (`dev`, `build`, `preview`) and confirm the default scaffold runs

## 2. Tool Registry

- [x] 2.1 Define the `StringTool` TypeScript interface (`id`, `path`, `name`, `component`) in `src/tools.ts`
- [x] 2.2 Export an empty (or placeholder) `tools: StringTool[]` array from `src/tools.ts`

## 3. App Shell

- [x] 3.1 Build `App.vue` as the thin wrapper: left-side menu + title + `<router-view>` content slot
- [x] 3.2 Generate the left-side menu items from the `tools` registry (label = `name`, link = `path`)
- [x] 3.3 Generate the router's routes from the `tools` registry (`path` → `component`)
- [x] 3.4 Render the active tool's `name` as the title above its content

## 4. Reverse String Tool

- [x] 4.1 Create `src/tools/ReverseString.vue` with a text input, a "Reverse" button, and an output area
- [x] 4.2 Implement the reverse transform, applied only on button click (not on input)
- [x] 4.3 Handle the empty-input case (button click with empty input shows empty output)
- [x] 4.4 Add a `reverse-string` entry to the `tools` registry pointing at this component

## 5. Verification

- [x] 5.1 Manually verify: app loads, menu shows "Reverse String", clicking it navigates to its route
- [x] 5.2 Manually verify: typing text and clicking the button reverses it; editing input afterward does not change the output until the button is clicked again
- [x] 5.3 Manually verify: navigating directly to the tool's URL renders it without needing a menu click
- [x] 5.4 Run `vite build` and confirm a clean production build with no type errors
