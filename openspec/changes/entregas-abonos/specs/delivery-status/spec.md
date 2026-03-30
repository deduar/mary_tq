## ADDED Requirements

### Requirement: Delivery has payment status
The system SHALL track the payment status of each delivery.

#### Scenario: Delivery states
- **WHEN** delivery is created
- **THEN** initial state is "Pendiente"
- **AND** state can be: Pendiente, ParcialmentePagada, Pagada

### Requirement: System updates delivery status automatically
The system SHALL update delivery status based on payments applied.

#### Scenario: Pendiente → ParcialmentePagada
- **WHEN** payment is applied but not fully covering total
- **THEN** delivery status changes to "ParcialmentePagada"

#### Scenario: ParcialmentePagada → Pagada
- **WHEN** total applied equals or exceeds delivery total
- **THEN** delivery status changes to "Pagada"

#### Scenario: Pagada → ParcialmentePagada
- **WHEN** payment is removed or reduced
- **THEN** delivery status recalculates
- **AND** changes to appropriate state

### Requirement: User can view delivery status
The system SHALL display delivery status in list and detail views.

#### Scenario: View delivery status
- **WHEN** viewing delivery list or detail
- **THEN** current status is displayed
- **AND** status has visual indicator (color)
