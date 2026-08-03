## MODIFIED Requirements

### Requirement: Shared wrapper chrome
The system SHALL render a shared wrapper around the active tool that displays the left-side menu and the active tool's `name` as a title, without constraining what the tool renders below the title. The shared wrapper SHALL also mount a single toast notification host so that any tool can trigger a toast without rendering its own notification UI.

#### Scenario: Wrapper renders consistent chrome across tools
- **WHEN** the user switches between two different tools
- **THEN** the menu and title chrome SHALL remain in the same layout position for both
- **AND** each tool's own content SHALL render unmodified in the content area below the title

#### Scenario: Toast host is available to every tool
- **WHEN** any tool component triggers a toast via the shared toast service
- **THEN** the toast SHALL render via the single host mounted in the shared wrapper, regardless of which tool triggered it
