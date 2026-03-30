## ADDED Requirements

### Requirement: User can create a new client
The system SHALL allow creating a new client with a required name field.

#### Scenario: Successful client creation
- **WHEN** user enters client name and submits the create form
- **THEN** system creates the client record with the provided name
- **AND** system assigns a unique UUID to the client
- **AND** system sets the creation timestamp
- **AND** system sets activo to true by default
- **AND** returns the created client in the response

#### Scenario: Client creation with empty name
- **WHEN** user submits create form with empty name
- **THEN** system displays validation error
- **AND** system does not create the client

### Requirement: User can list all clients
The system SHALL return a list of all active clients sorted alphabetically by name.

#### Scenario: List clients successfully
- **WHEN** user navigates to clients list view
- **THEN** system returns all clients with activo = true
- **AND** clients are sorted alphabetically by nombre
- **AND** each client displays id, nombre, and fecha_creacion

### Requirement: User can view client details
The system SHALL return complete client information including associated deliveries and payments.

#### Scenario: View client detail
- **WHEN** user selects a client from the list
- **THEN** system returns client with id, nombre, fecha_creacion
- **AND** system includes associated entregas (if any)
- **AND** system includes associated abonos (if any)
- **AND** system calculates and includes current saldo

#### Scenario: View non-existent client
- **WHEN** user requests detail for non-existent client ID
- **THEN** system returns 404 error
- **AND** system returns error message "Cliente no encontrado"

### Requirement: User can edit client name
The system SHALL allow modifying the name of an existing client.

#### Scenario: Successful client edit
- **WHEN** user modifies client name and submits
- **THEN** system updates the client's nombre field
- **AND** returns the updated client in the response

#### Scenario: Edit non-existent client
- **WHEN** user attempts to edit non-existent client
- **THEN** system returns 404 error

### Requirement: System does not delete clients
The system SHALL preserve all client records for historical purposes.

#### Scenario: Delete client request
- **WHEN** user requests to delete a client
- **THEN** system does not remove the record
- **AND** system returns appropriate message or handles via soft-delete flag
