## ADDED Requirements

### Requirement: Database contains clientes table
The system SHALL store client data in a SQLite database.

#### Scenario: Create clientes table
- **WHEN** database is initialized
- **THEN** clientes table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - nombre: TEXT (NOT NULL)
  - fecha_creacion: TEXT (ISO datetime, NOT NULL)
  - activo: INTEGER (DEFAULT 1)

#### Scenario: Insert client record
- **WHEN** API receives POST /api/clientes
- **THEN** new record is inserted into clientes table
- **AND** UUID is generated for id field
- **AND** fecha_creacion is set to current datetime

### Requirement: Database contains productos table
The system SHALL store product data in SQLite database.

#### Scenario: Create productos table
- **WHEN** database is initialized
- **THEN** productos table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT (nullable)
  - fecha_creacion: TEXT (ISO datetime, NOT NULL)
  - activo: INTEGER (DEFAULT 1)

#### Scenario: Insert product record
- **WHEN** API receives POST /api/productos
- **THEN** new record is inserted into productos table
- **AND** UUID is generated for id field

### Requirement: Database contains precios_cliente_producto table
The system SHALL store client-product pricing relationships.

#### Scenario: Create precios table
- **WHEN** database is initialized
- **THEN** precios_cliente_producto table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - cliente_id: TEXT (FOREIGN KEY to clientes.id)
  - producto_id: TEXT (FOREIGN KEY to productos.id)
  - precio: REAL (NOT NULL)
  - fecha_inicio: TEXT (ISO datetime, NOT NULL)

### Requirement: Database contains entregas table
The system SHALL store delivery records.

#### Scenario: Create entregas table
- **WHEN** database is initialized
- **THEN** entregas table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - cliente_id: TEXT (FOREIGN KEY to clientes.id)
  - fecha: TEXT (ISO datetime, NOT NULL)
  - total: REAL (NOT NULL, DEFAULT 0)
  - estado: TEXT (Pendiente/ParcialmentePagada/Pagada/Cancelada)
  - fecha_creacion: TEXT (ISO datetime, NOT NULL)

### Requirement: Database contains entrega_producto table
The system SHALL store products associated with each delivery.

#### Scenario: Create entrega_producto table
- **WHEN** database is initialized
- **THEN** entrega_producto table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - entrega_id: TEXT (FOREIGN KEY to entregas.id)
  - producto_id: TEXT (FOREIGN KEY to productos.id)
  - cantidad: INTEGER (NOT NULL)
  - precio_unitario: REAL (NOT NULL)
  - subtotal: REAL (NOT NULL)

### Requirement: Database contains abonos table
The system SHALL store payment/credit records.

#### Scenario: Create abonos table
- **WHEN** database is initialized
- **THEN** abonos table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - cliente_id: TEXT (FOREIGN KEY to clientes.id)
  - monto: REAL (NOT NULL)
  - fecha: TEXT (ISO datetime, NOT NULL)
  - estado: TEXT (Aplicado/Disponible)
  - fecha_creacion: TEXT (ISO datetime, NOT NULL)

### Requirement: Database contains abono_entrega table
The system SHALL store the many-to-many relationship between abonos and entregas.

#### Scenario: Create abono_entrega table
- **WHEN** database is initialized
- **THEN** abono_entrega table is created with columns:
  - id: TEXT (UUID, PRIMARY KEY)
  - abono_id: TEXT (FOREIGN KEY to abonos.id)
  - entrega_id: TEXT (FOREIGN KEY to entregas.id)
  - monto_aplicado: REAL (NOT NULL)

### Requirement: Database file is created in correct location
The system SHALL create SQLite database file in the server directory.

#### Scenario: Database file location
- **WHEN** server starts for the first time
- **THEN** database.sqlite file is created in server/db/ directory
- **AND** file persists between server restarts
