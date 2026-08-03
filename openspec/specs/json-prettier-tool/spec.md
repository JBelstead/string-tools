# json-prettier-tool Specification

## Purpose
Defines the "JSON Prettier" tool: a text input, an indent-width selector, a "Format" button, and an output area that pretty-prints valid JSON on demand and surfaces parse errors via a toast instead of updating the output.

## Requirements

### Requirement: Pretty-print JSON on demand
The system SHALL provide a "JSON Prettier" tool with a text input, an indent-width selector, a "Format" button, and an output area. The system SHALL parse the input as JSON and display it re-serialized with the configured indent width in the output area only when the button is clicked (not reactively as the user types).

#### Scenario: Formatting valid, non-pretty-printed JSON
- **WHEN** the user types `{"a":1,"b":[2,3]}` into the input with indent width `2` and clicks "Format"
- **THEN** the output area SHALL display the same JSON re-serialized with 2-space indentation

#### Scenario: Input changes do not update output until the button is clicked
- **WHEN** the user has already formatted one JSON string and then edits the input text without clicking "Format" again
- **THEN** the output area SHALL continue showing the previous result, unchanged

### Requirement: Configurable indent width
The system SHALL provide an indent-width selector offering `2`, `4`, and `8` spaces, defaulting to `2`.

#### Scenario: Default indent width
- **WHEN** the user loads the tool without changing the indent-width selector
- **THEN** the selector SHALL show `2` and formatting SHALL use 2-space indentation

#### Scenario: Custom indent width
- **WHEN** the user sets the indent-width selector to `4` and clicks "Format" on valid JSON
- **THEN** the output SHALL be serialized with 4-space indentation

#### Scenario: Widest indent width
- **WHEN** the user sets the indent-width selector to `8` and clicks "Format" on valid JSON
- **THEN** the output SHALL be serialized with 8-space indentation

### Requirement: Invalid JSON surfaces an error via toast
The system SHALL leave the output area unchanged and SHALL trigger a toast notification containing a parse-error message when the input cannot be parsed as valid JSON at the time "Format" is clicked.

#### Scenario: Formatting malformed JSON
- **WHEN** the user types `{"a":}` into the input and clicks "Format"
- **THEN** the output area SHALL remain unchanged from its prior state
- **AND** a toast notification SHALL appear containing a message describing the JSON parse error

#### Scenario: Formatting empty input
- **WHEN** the user clicks "Format" with an empty input
- **THEN** the system SHALL treat this as invalid JSON
- **AND** a toast notification SHALL appear rather than the output area showing an empty result
