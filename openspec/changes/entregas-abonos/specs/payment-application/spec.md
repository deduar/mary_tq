## ADDED Requirements

### Requirement: User can apply payment to specific deliveries
The system SHALL allow applying a payment to one or more pending deliveries.

#### Scenario: Apply payment to delivery
- **WHEN** user selects a payment to apply
- **AND** selects one or more deliveries
- **AND** enters amount to apply to each
- **THEN** system creates abono_entrega records
- **AND** updates delivery status based on new applied amount

#### Scenario: Partial payment application
- **WHEN** payment amount is greater than delivery total
- **THEN** system applies only what's needed
- **AND** remaining payment stays as "Disponible" credit

#### Scenario: Apply to multiple deliveries
- **WHEN** user applies payment to multiple deliveries
- **AND** total exceeds payment amount
- **THEN** system applies proportionally or user specifies amounts
- **AND** each delivery status updates accordingly

### Requirement: System tracks applied vs available payment
The system SHALL track how much of a payment has been applied.

#### Scenario: Track payment application
- **WHEN** payment is applied to deliveries
- **THEN** system calculates: monto - suma(monto_aplicado)
- **AND** remaining shows as "Disponible"
- **AND** when fully applied, estado changes to "Aplicado"
