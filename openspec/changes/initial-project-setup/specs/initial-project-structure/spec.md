## ADDED Requirements

### Requirement: Project has Vue 3 frontend structure
The system SHALL have a properly configured Vue 3 frontend application.

#### Scenario: Vue project initialization
- **WHEN** developer runs `npm create vite@latest client -- --template vue`
- **THEN** a new Vue 3 project is created in /client directory
- **AND** project includes vite.config.js with default configuration
- **AND** project includes package.json with vue and vite dependencies
- **AND** src/App.vue and src/main.js are present

#### Scenario: Vue router is configured
- **WHEN** router is set up in the Vue application
- **THEN** Vue Router is installed and configured
- **AND** routes are defined for: /clientes, /productos, /entregas, /abonos, /
- **AND** navigation between views works correctly

### Requirement: Project has Node.js backend structure
The system SHALL have a properly configured Node.js + Express backend.

#### Scenario: Backend project initialization
- **WHEN** developer creates server directory and initializes npm
- **THEN** package.json includes express, better-sqlite3, cors dependencies
- **AND** index.js file exists with Express server setup
- **AND** server listens on configured port (default 3000)

#### Scenario: Backend serves API endpoints
- **WHEN** Express server is running
- **THEN** server handles CORS for all origins
- **AND** JSON is the response format for all endpoints
- **AND** Error responses follow format: { "error": "message" }

### Requirement: Frontend can communicate with backend
The system SHALL allow Vue frontend to make HTTP requests to Express API.

#### Scenario: Frontend API service configuration
- **WHEN** frontend makes HTTP request
- **THEN** requests are sent to http://localhost:3000/api/* endpoints
- **AND** responses are handled in JSON format
- **AND** errors are displayed appropriately to user

#### Scenario: CORS allows frontend requests
- **WHEN** frontend makes cross-origin request to backend
- **THEN** CORS headers are present in response
- **AND** request is not blocked by browser

### Requirement: Development environment works
The system SHALL allow running both frontend and backend in development mode.

#### Scenario: Run frontend dev server
- **WHEN** developer runs `npm run dev` in /client
- **THEN** Vite dev server starts
- **AND** application is accessible at localhost:5173 (or configured port)

#### Scenario: Run backend server
- **WHEN** developer runs `node index.js` in /server
- **THEN** Express server starts
- **AND** API is accessible at localhost:3000
