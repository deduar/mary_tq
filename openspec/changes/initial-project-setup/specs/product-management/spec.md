## ADDED Requirements

### Requirement: User can create a new product
The system SHALL allow creating a new product with a required name and optional description.

#### Scenario: Successful product creation with name only
- **WHEN** user enters product name and submits the create form
- **THEN** system creates the product record with the provided name
- **AND** system assigns a unique UUID to the product
- **AND** system sets the creation timestamp
- **AND** system sets activo to true by default
- **AND** descripcion is set to null or empty
- **AND** returns the created product in the response

#### Scenario: Successful product creation with name and description
- **WHEN** user enters product name and description
- **THEN** system creates the product with both fields
- **AND** returns the created product in the response

#### Scenario: Product creation with empty name
- **WHEN** user submits create form with empty name
- **THEN** system displays validation error
- **AND** system does not create the product

### Requirement: User can list all products
The system SHALL return a list of all active products sorted alphabetically by name.

#### Scenario: List products successfully
- **WHEN** user navigates to products list view
- **THEN** system returns all products with activo = true
- **AND** products are sorted alphabetically by nombre
- **AND** each product displays id, nombre, descripcion, and fecha_creacion

### Requirement: User can view product details
The system SHALL return complete product information.

#### Scenario: View product detail
- **WHEN** user selects a product from the list
- **THEN** system returns product with id, nombre, descripcion, fecha_creacion, activo

#### Scenario: View non-existent product
- **WHEN** user requests detail for non-existent product ID
- **THEN** system returns 404 error
- **AND** system returns error message "Producto no encontrado"

### Requirement: User can edit product name and description
The system SHALL allow modifying the name and description of an existing product.

#### Scenario: Successful product edit
- **WHEN** user modifies product name or description and submits
- **THEN** system updates the product's fields
- **AND** returns the updated product in the response

#### Scenario: Edit non-existent product
- **WHEN** user attempts to edit non-existent product
- **THEN** system returns 404 error

### Requirement: System does not delete products
The system SHALL preserve all product records for historical purposes.

#### Scenario: Delete product request
- **WHEN** user requests to delete a product
- **THEN** system does not remove the record
- **AND** system returns appropriate message or handles via soft-delete flag
