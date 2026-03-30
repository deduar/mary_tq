## ADDED Requirements

### Requirement: User can register a delivery with a client
The system SHALL allow selecting a client when creating a delivery.

#### Scenario: Select client for delivery
- **WHEN** user navigates to create delivery
- **THEN** system displays list of active clients
- **AND** user can select one client
- **AND** client is required to create delivery

### Requirement: User can add multiple products to a delivery
The system SHALL allow adding multiple products with quantities to a single delivery.

#### Scenario: Add products to delivery
- **WHEN** user is creating a delivery
- **THEN** user can add multiple products
- **AND** for each product enter quantity
- **AND** user can remove products before saving

#### Scenario: Add same product multiple times
- **WHEN** user adds same product twice
- **THEN** system combines quantities into single entry
- **AND** quantity is summed

### Requirement: System calculates subtotal and total automatically
The system SHALL calculate product subtotals and delivery total automatically.

#### Scenario: Calculate subtotal
- **WHEN** product is added with quantity
- **THEN** system calculates: quantity × price = subtotal
- **AND** displays subtotal for that product

#### Scenario: Calculate total
- **WHEN** products are added to delivery
- **THEN** system calculates sum of all subtotals
- **AND** displays total at bottom of delivery form

### Requirement: User can set delivery date
The system SHALL allow setting the delivery date.

#### Scenario: Set delivery date
- **WHEN** user creates delivery
- **THEN** date field defaults to current date
- **AND** user can change to specific date

### Requirement: System creates delivery record
The system SHALL persist the delivery to database.

#### Scenario: Save delivery
- **WHEN** user confirms delivery with products
- **THEN** system creates entrega record
- **AND** system creates entrega_producto records for each product
- **AND** delivery status is set to Pendiente
- **AND** returns created delivery in response

### Requirement: Delivery requires at least one product
The system SHALL not allow empty deliveries.

#### Scenario: Save delivery with no products
- **WHEN** user attempts to save delivery without products
- **THEN** system shows validation error
- **AND** delivery is not saved
