## Context

Mary's delivery control system requires a web-based application with mobile-first design. The system will be built with Vue 3 frontend and Node.js + Express backend using SQLite for data persistence. This is the initial setup phase, establishing the project structure and basic entity management (clients and products).

Current state: No code exists. Only documentation (PRD, Architecture, Epics) has been created.

## Goals / Non-Goals

**Goals:**
- Set up complete project structure with Vue 3 frontend and Node.js backend
- Configure Docker container for development environment
- Configure SQLite database with proper schema
- Implement client CRUD operations with API endpoints
- Implement product CRUD operations with API endpoints
- Ensure frontend can communicate with backend via REST API
- Implement comprehensive test suite (unit, integration, business logic)

**Non-Goals:**
- Authentication/authorization (not required per PRD)
- Delivery and payment (abono) management (future epic)
- Dashboard analytics (future epic)
- Production deployment/CI/CD (future phase)
- End-to-end browser testing (manual verification acceptable)

## Decisions

### 1. Project Structure
- **Decision**: Separate client (Vue 3) and server (Node.js) folders
- **Rationale**: Clear separation allows independent development and deployment. Matches architecture specification.
- **Alternative considered**: Monorepo with shared code - adds complexity unnecessary for MVP

### 2. Database: SQLite with better-sqlite3
- **Decision**: Use better-sqlite3 driver for synchronous SQLite operations
- **Rationale**: Simple, file-based, no configuration needed. better-sqlite3 provides synchronous API which is simpler for this use case.
- **Alternative considered**: pg/PostgreSQL - adds deployment complexity

### 3. API Design: REST with JSON
- **Decision**: RESTful endpoints returning JSON
- **Rationale**: Matches architecture specification, simple to implement and consume
- **Alternative considered**: GraphQL - adds complexity without clear benefit for this scope

### 4. Frontend State Management
- **Decision**: Use Vue 3 Composition API with ref/reactive (no Pinia)
- **Rationale**: Simple enough for MVP without adding state management library
- **Alternative considered**: Pinia - adds dependency, overkill for simple app

### 5. CORS Configuration
- **Decision**: Enable CORS for development, allow all origins
- **Rationale**: No authentication required, single user app
- **Alternative considered**: Specific origins - adds complexity without benefit

### 6. Docker Setup
- **Decision**: Use Docker Compose for containerized development
- **Image name**: `mary-tq/app:latest:dev`
- **Container name**: `mary-tq-dev`
- **Network**: `mary-tq-network` (bridge driver)
- **Volume**: Bind mount project directory for live reload
- **Rationale**: Consistent development environment, easy setup for Mary
- **Alternative considered**: Local installation - less portable, environment inconsistencies

### 7. Testing Framework
- **Decision**: Vitest for frontend, Jest for backend
- **Coverage target**: Minimum 80% for business logic
- **Test types**: Unit tests, integration tests, business logic tests
- **Rationale**: Vitest integrates well with Vite, Jest is mature for Node.js backend
- **Alternative considered**: Single test framework - adds complexity without clear benefit

## Risks / Trade-offs

- **Risk**: No authentication → Anyone with URL can access
  - **Mitigation**: Acceptable per PRD requirements (no auth needed for Mary)
- **Risk**: SQLite not suitable for high concurrency
  - **Mitigation**: Single user app, no concurrency concerns
- **Risk**: No data backup in MVP
  - **Mitigation**: Manual backup acceptable for v1.0 per PRD
- **Risk**: Docker volume permissions on Linux
  - **Mitigation**: Use correct UID/GID in Dockerfile
- **Risk**: Tests don't cover all business logic
  - **Mitigation**: Require 80% minimum coverage, business logic tests per use case

## Migration Plan

1. Create project directories and initialize npm packages
2. Set up Docker Compose with volume and network configuration
3. Set up database schema with SQLite
4. Implement backend API routes for clientes and productos
5. Create Vue components and views for client/product management
6. Implement test suite (unit, integration, business logic)
7. Verify tests pass with coverage targets
8. Test full stack integration
9. No rollback needed for initial setup (fresh project)
