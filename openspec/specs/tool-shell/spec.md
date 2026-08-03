# tool-shell Specification

## Purpose
TBD - defines the shared shell that hosts all string tools: the typed tool registry, the left-side navigation menu, per-tool routing, and the shared wrapper chrome rendered around each tool.

## Requirements

### Requirement: Typed tool registry
The system SHALL maintain a single typed registry (`tools.ts`) listing every available tool as an entry with, at minimum, a unique `id`, a route `path`, a display `name`, and a reference to the tool's `component`. This registry SHALL be the single source of truth that both the navigation menu and the router are generated from.

#### Scenario: Registry entry missing a required field
- **WHEN** a tool entry is added to the registry without one of the required fields (`id`, `path`, `name`, `component`)
- **THEN** the TypeScript compiler SHALL report a type error rather than allowing the app to build

### Requirement: Left-side tool menu
The system SHALL render a left-side menu listing every tool currently in the registry, using each entry's `name` as the visible label.

#### Scenario: Menu reflects registry contents
- **WHEN** the app loads with N entries in the tool registry
- **THEN** the left-side menu SHALL display N items, one per registry entry, in registry order

### Requirement: Per-tool routing
The system SHALL expose one route per registry entry, generated from the registry's `path` field, so each tool has its own bookmarkable URL.

#### Scenario: Selecting a tool navigates to its route
- **WHEN** a user clicks a tool's menu item
- **THEN** the browser URL SHALL change to that tool's registered `path`
- **AND** the corresponding tool's component SHALL render in the main content area

#### Scenario: Direct navigation to a tool's URL
- **WHEN** a user loads the app directly at a tool's registered `path`
- **THEN** that tool's component SHALL render without requiring a menu click

### Requirement: Shared wrapper chrome
The system SHALL render a shared wrapper around the active tool that displays the left-side menu and the active tool's `name` as a title, without constraining what the tool renders below the title. The shared wrapper SHALL also mount a single toast notification host so that any tool can trigger a toast without rendering its own notification UI.

#### Scenario: Wrapper renders consistent chrome across tools
- **WHEN** the user switches between two different tools
- **THEN** the menu and title chrome SHALL remain in the same layout position for both
- **AND** each tool's own content SHALL render unmodified in the content area below the title

#### Scenario: Toast host is available to every tool
- **WHEN** any tool component triggers a toast via the shared toast service
- **THEN** the toast SHALL render via the single host mounted in the shared wrapper, regardless of which tool triggered it
