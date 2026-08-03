# toast-notifications Specification

## Purpose
Defines the shared, app-wide toast notification service that any tool can use to surface a transient message (such as an error) without owning its own notification UI.

## Requirements

### Requirement: Shared toast trigger
The system SHALL expose a shared toast service (e.g., a `useToast()` composable) that any tool component can call with a message to display a transient notification, without that tool owning any notification markup or styling itself.

#### Scenario: A tool triggers a toast
- **WHEN** a tool component calls the shared toast service with a message string
- **THEN** a toast notification displaying that message SHALL appear on screen

### Requirement: Single active toast with auto-dismiss
The system SHALL display at most one toast at a time. Triggering a new toast while one is already visible SHALL replace its message. Each toast SHALL automatically dismiss after a fixed delay without requiring user interaction.

#### Scenario: Toast disappears on its own
- **WHEN** a toast is triggered and no further action is taken
- **THEN** the toast SHALL automatically disappear after a fixed delay

#### Scenario: Triggering a toast while one is already visible
- **WHEN** a toast is currently visible and a new toast is triggered with a different message
- **THEN** the visible toast SHALL update to show the new message
- **AND** its auto-dismiss timer SHALL restart
