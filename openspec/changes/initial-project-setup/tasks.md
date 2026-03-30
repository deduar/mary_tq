## 1. Docker Setup

- [x] 1.1 Create Dockerfile in project root
- [x] 1.2 Configure base image (Node.js latest)
- [x] 1.3 Set working directory to /app
- [x] 1.4 Create package.json files (frontend and backend structure)
- [x] 1.5 Copy package*.json files
- [x] 1.6 Expose ports 3000 (backend) and 5173 (frontend)
- [x] 1.7 Create docker-compose.yml
- [x] 1.8 Set image name to "mary-tq/app:dev"
- [x] 1.9 Set container name to "mary-tq-dev"
- [x] 1.10 Configure network "mary-tq-network" (bridge)
- [x] 1.11 Configure volume for live reload (bind mount project directory)
- [x] 1.12 Test Docker container builds successfully

## 2. Project Setup (Inside Container)

- [x] 2.1 Start Docker container with docker-compose
- [x] 2.2 Install Vue 3 frontend with Vite inside container
- [x] 2.3 Install frontend dependencies (vue-router) inside container
- [x] 2.4 Create server directory and initialize npm inside container
- [x] 2.5 Install backend dependencies (express, better-sqlite3, cors, uuid) inside container
- [x] 2.6 Configure CORS in Express server

## 3. Database Setup

- [x] 3.1 Create server/db directory structure
- [x] 3.2 Create database initialization script with SQLite schema
- [x] 3.3 Create all tables: clientes, productos, precios_cliente_producto, entregas, entrega_producto, abonos, abono_entrega
- [x] 3.4 Test database file creation

## 4. Backend API - Clientes

- [x] 4.1 Create GET /api/clientes endpoint (list all clients)
- [x] 4.2 Create POST /api/clientes endpoint (create client)
- [x] 4.3 Create GET /api/clientes/:id endpoint (get client detail)
- [x] 4.4 Create PUT /api/clientes/:id endpoint (update client)
- [x] 4.5 Test all cliente endpoints

## 5. Backend API - Productos

- [x] 5.1 Create GET /api/productos endpoint (list all products)
- [x] 5.2 Create POST /api/productos endpoint (create product)
- [x] 5.3 Create GET /api/productos/:id endpoint (get product detail)
- [x] 5.4 Create PUT /api/productos/:id endpoint (update product)
- [x] 5.5 Test all producto endpoints

## 6. Frontend - Project Structure

- [x] 6.1 Set up Vue Router with routes for /clientes, /productos
- [x] 6.2 Create API service layer (services/api.js)
- [x] 6.3 Create base layout components (Header, Navigation)

## 7. Frontend - Client Management

- [x] 7.1 Create ClienteList view (list all clients)
- [x] 7.2 Create ClienteForm component (create/edit client)
- [x] 7.3 Create ClienteDetail view (view client details)
- [x] 7.4 Connect client views to API

## 8. Frontend - Product Management

- [x] 8.1 Create ProductoList view (list all products)
- [x] 8.2 Create ProductoForm component (create/edit product)
- [x] 8.3 Connect product views to API

## 9. Backend Testing Setup

- [x] 9.1 Install Jest and jest.config.js inside container
- [x] 9.2 Configure Jest for ES modules
- [x] 9.3 Add test script to server/package.json
- [x] 9.4 Create __tests__ directory structure

## 10. Backend Unit Tests - Database

- [x] 10.1 Write unit tests for create client function
- [x] 10.2 Write unit tests for get clients function
- [x] 10.3 Write unit tests for get client by ID
- [x] 10.4 Write unit tests for update client function
- [x] 10.5 Write unit tests for create product function
- [x] 10.6 Write unit tests for get products function
- [x] 10.7 Write unit tests for get product by ID
- [x] 10.8 Write unit tests for update product function
- [x] 10.9 Run tests and verify all pass

## 11. Backend Unit Tests - API Endpoints

- [x] 11.1 Write tests for GET /api/clientes (status, JSON structure)
- [x] 11.2 Write tests for POST /api/clientes (create, validation)
- [x] 11.3 Write tests for GET /api/clientes/:id (not found)
- [x] 11.4 Write tests for PUT /api/clientes/:id (update)
- [x] 11.5 Write tests for GET /api/productos
- [x] 11.6 Write tests for POST /api/productos
- [x] 11.7 Write tests for GET /api/productos/:id
- [x] 11.8 Write tests for PUT /api/productos/:id
- [x] 11.9 Run API tests and verify all pass

## 12. Backend Integration Tests - CRUD Flows

- [x] 12.1 Write integration test: create client → retrieve → update → verify
- [x] 12.2 Write integration test: create product → retrieve → update → verify
- [x] 12.3 Write integration test: verify data persistence
- [x] 12.4 Run integration tests and verify all pass

## 13. Backend Business Logic Tests

- [x] 13.1 Write test: client creation validates required name
- [x] 13.2 Write test: client list returns only active clients
- [x] 13.3 Write test: client detail includes calculated saldo
- [x] 13.4 Write test: product creation validates required name
- [x] 13.5 Write test: product list returns only active products
- [x] 13.6 Run business logic tests and verify all pass

## 14. Frontend Testing Setup

- [x] 14.1 Install Vitest and configure vitest.config.js inside container
- [x] 14.2 Add test script to client/package.json
- [x] 14.3 Create __tests__ directory structure

## 15. Frontend Unit Tests

- [x] 15.1 Write unit tests for ClienteList component
- [x] 15.2 Write unit tests for ClienteForm component
- [x] 15.3 Write unit tests for ProductoList component
- [x] 15.4 Write unit tests for ProductoForm component
- [x] 15.5 Run frontend tests and verify all pass

## 16. Coverage Configuration

- [x] 16.1 Configure Jest coverage threshold (80%)
- [x] 16.2 Configure Vitest coverage threshold (80%)
- [x] 16.3 Generate coverage reports
- [x] 16.4 Verify all thresholds met (statements, branches, functions, lines)

## 17. Integration Testing - Full Stack

- [x] 17.1 Test full client CRUD flow (API + frontend)
- [x] 17.2 Test full product CRUD flow (API + frontend)
- [x] 17.3 Verify database persistence
- [x] 17.4 Test frontend-backend communication

## 18. Docker Test Execution

- [x] 18.1 Verify tests run inside Docker container
- [x] 18.2 Run `docker compose exec app npm test` successfully
- [x] 18.3 Verify coverage reports accessible in container

## 19. Polish

- [x] 19.1 Add basic styling for mobile-first design
- [x] 19.2 Add error handling and user feedback
- [x] 19.3 Verify all specs requirements are met
- [x] 19.4 Final verification: all tests pass, coverage targets met
