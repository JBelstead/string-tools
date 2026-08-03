# reverse-string-tool Specification

## Purpose
TBD - defines the "Reverse String" tool: a text input, a button, and an output area that reverses the input text's character order on demand.

## Requirements

### Requirement: Reverse a string on demand
The system SHALL provide a "Reverse String" tool with a text input, a button, and an output area. The system SHALL reverse the input text's character order and display it in the output area only when the button is clicked (not reactively as the user types).

#### Scenario: Reversing a non-empty string
- **WHEN** the user types "hello" into the input and clicks the reverse button
- **THEN** the output area SHALL display "olleh"

#### Scenario: Input changes do not update output until the button is clicked
- **WHEN** the user has already reversed one string and then edits the input text without clicking the button again
- **THEN** the output area SHALL continue showing the previous result, unchanged

#### Scenario: Reversing an empty string
- **WHEN** the user clicks the reverse button with an empty input
- **THEN** the output area SHALL display an empty result
