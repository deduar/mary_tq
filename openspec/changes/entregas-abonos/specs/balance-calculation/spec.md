## ADDED Requirements

### Requirement: System calculates client balance (saldo)
The system SHALL calculate the total balance owed by a client.

#### Scenario: Calculate saldo
- **WHEN** requesting client balance
- **THEN** saldo = SUM(entregas.total) - SUM(abonos.monto_aplicado)
- **AND** returns calculated saldo with client details

#### Scenario: Saldo includes all deliveries
- **WHEN** calculating saldo
- **AND** client has deliveries in any state
- **THEN** all delivery totals are included in calculation
- **AND** only applied payments are deducted

### Requirement: Saldo is calculated dynamically
The system SHALL calculate saldo at request time.

#### Scenario: Real-time saldo
- **WHEN** delivery or payment is created/updated
- **AND** client balance is requested
- **THEN** system recalculates from current data
- **AND** returns current saldo (not cached)

### Requirement: Saldo can be negative
The system SHALL allow negative saldo (client has overpaid).

#### Scenario: Overpayment
- **WHEN** applied payments exceed delivery total
- **THEN** saldo is negative
- **AND** displays as credit available
