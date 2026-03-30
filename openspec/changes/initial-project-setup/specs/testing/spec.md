## ADDED Requirements

### Requirement: Backend has Jest test framework configured
The system SHALL have Jest installed and configured for backend testing.

#### Scenario: Jest configuration
- **WHEN** backend package.json is checked
- **THEN** jest is listed in devDependencies
- **AND** jest.config.js or jest configuration exists
- **AND** test script is defined in package.json

#### Scenario: Test execution
- **WHEN** developer runs `npm test` in server
- **THEN** test suite executes
- **AND** results are displayed with pass/fail status

### Requirement: Frontend has Vitest test framework configured
The system SHALL have Vitest installed and configured for frontend testing.

#### Scenario: Vitest configuration
- **WHEN** frontend package.json is checked
- **AND** vitest is listed in devDependencies
- **AND** vitest.config.js exists
- **AND** test script is defined in package.json

#### Scenario: Frontend test execution
- **WHEN** developer runs `npm test` in client
- **THEN** test suite executes
- **AND** results are displayed with pass/fail status

### Requirement: Unit tests exist for database layer
The system SHALL have unit tests for database operations.

#### Scenario: Database unit tests
- **WHEN** database functions are tested
- **THEN** tests cover: create client, create product, query clients, query products
- **AND** tests use mock database or test database

### Requirement: Unit tests exist for API endpoints
The system SHALL have unit tests for API route handlers.

#### Scenario: API endpoint tests
- **WHEN** API endpoints are tested
- **THEN** tests cover: GET /api/clientes, POST /api/clientes, GET /api/clientes/:id, PUT /api/clientes/:id
- **AND** tests cover: GET /api/productos, POST /api/productos, GET /api/productos/:id, PUT /api/productos/:id
- **AND** tests verify response status codes and JSON structure

### Requirement: Integration tests exist for full CRUD flows
The system SHALL have integration tests covering complete CRUD operations.

#### Scenario: Client CRUD integration test
- **WHEN** client CRUD flow is tested
- **THEN** test creates client → retrieves client → updates client → verifies changes
- **AND** test verifies data persistence in database

#### Scenario: Product CRUD integration test
- **WHEN** product CRUD flow is tested
- **THEN** test creates product → retrieves product → updates product → verifies changes
- **AND** test verifies data persistence in database

### Requirement: Business logic tests exist for client operations
The system SHALL have tests that verify business rules for client management.

#### Scenario: Client creation validates required fields
- **WHEN** creating client with empty name
- **THEN** system returns validation error
- **AND** client is not created in database

#### Scenario: Client list returns only active clients
- **WHEN** requesting client list
- **AND** some clients have activo = false
- **THEN** only clients with activo = true are returned

#### Scenario: Client detail includes calculated saldo
- **WHEN** requesting client detail
- **THEN** response includes calculated saldo (entregas total - abonos total)

### Requirement: Business logic tests exist for product operations
The system SHALL have tests that verify business rules for product management.

#### Scenario: Product creation validates required fields
- **WHEN** creating product with empty name
- **THEN** system returns validation error
- **AND** product is not created in database

#### Scenario: Product list returns only active products
- **WHEN** requesting product list
- **AND** some products have activo = false
- **THEN** only products with activo = true are returned

### Requirement: Test coverage meets minimum threshold
The system SHALL maintain at least 80% code coverage for business logic.

#### Scenario: Coverage report exists
- **WHEN** coverage report is generated
- **THEN** statements coverage is >= 80%
- **AND** branches coverage is >= 80%
- **AND** functions coverage is >= 80%
- **AND** lines coverage is >= 80%

#### Scenario: Coverage check in CI
- **WHEN** tests are run with coverage
- **THEN** build fails if coverage is below threshold
- **AND** report is generated in coverage/ directory

### Requirement: Tests can run in Docker container
The system SHALL allow running tests inside the Docker container.

#### Scenario: Run tests in container
- **WHEN** developer runs `docker-compose exec app npm test`
- **THEN** tests execute inside container
- **AND** results are displayed in terminal

### Requirement: Vue components have unit tests
The system SHALL have unit tests for Vue components.

#### Scenario: Component renders correctly
- **WHEN** Vue component is tested
- **THEN** component mounts without errors
- **AND** expected content is rendered

#### Scenario: Component responds to user interaction
- **WHEN** user interacts with component in test
- **THEN** appropriate events are emitted
- **AND** state changes correctly
