## Why

Mary needs a digital system to track deliveries, payments, and balances for her artisanal product business. Currently manual tracking makes it difficult to know balances owed by clients and product performance. Starting with the initial project setup establishes the foundation for all future development.

## What Changes

- Initialize Vue 3 + Vite frontend project structure
- Initialize Node.js + Express backend with SQLite database
- Set up Docker container for development environment
- Implement client CRUD functionality (create, list, detail, edit)
- Implement product CRUD functionality (create, list, edit)
- Set up API endpoints and database schema for entities
- Implement comprehensive testing (unit, integration, business logic)

## Capabilities

### New Capabilities
- `client-management`: Create, list, view details, and edit client records
- `product-management`: Create, list, and edit product catalog entries
- `initial-project-structure`: Base project setup with Vue frontend and Node backend
- `database-schema`: SQLite database with tables for clientes, productos, precios, entregas, abonos
- `docker-setup`: Docker container configuration for development environment
- `testing`: Unit, integration, and business logic test coverage

### Modified Capabilities
- (None - initial implementation)

## Impact

- New folder structure: `/client` (Vue 3 frontend), `/server` (Node.js backend)
- Docker container with volume, network, named image and container, latest:dev tag
- New API endpoints: `/api/clientes`, `/api/productos`
- New database: `server/db/database.sqlite`
- Dependencies: vue, vite, express, better-sqlite3, cors
- Testing framework: Vitest for frontend, Jest for backend
