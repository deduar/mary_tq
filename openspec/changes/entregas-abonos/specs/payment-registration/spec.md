## ADDED Requirements

### Requirement: User can register a payment (abono)
The system SHALL allow registering payments from clients.

#### Scenario: Register payment
- **WHEN** user navigates to create payment
- **AND** selects a client
- **AND** enters monto (amount)
- **AND** enters fecha (date)
- **AND** confirms
- **THEN** system creates abono record
- **AND** abono estado is "Disponible"

#### Scenario: Payment amount must be positive
- **WHEN** user enters negative or zero amount
- **THEN** system shows validation error

#### Scenario: Payment requires client
- **WHEN** user attempts to create payment without client
- **THEN** system shows validation error

### Requirement: User can view payment history
The system SHALL display all payments for a client.

#### Scenario: View payment history
- **WHEN** user views client detail
- **THEN** system shows list of all abonos for that client
- **AND** displays: fecha, monto, estado
