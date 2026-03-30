---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-28'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
workflowType: 'architecture'
project_name: 'mary_tq'
user_name: 'Edu'
date: '2026-03-28'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Starter Template Evaluation

### Primary Technology Domain

Web App / SPA - Vue 3 con Vite como frontend, Node.js + Express como backend, SQLite como base de datos.

### Technical Preferences

- **Frontend:** Vue 3 + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite con better-sqlite3 (sin ORM, más simple)
- **Prefferencia:** Mantener la solución lo más sencilla posible

### Selected Stack: Vue + Node.js + SQLite

**Rationale:**
- Vite + Vue 3: Frontend mínimo y rápido
- Express + better-sqlite3: Backend simple sin complejidad adicional
- SQLite: Base de datos simple, archivo único, sin configuración

### Stack Components

**Frontend:**
- Vue 3 (Composition API)
- Vite (build tool)
- Vue Router (enrutamiento)

**Backend:**
- Node.js
- Express.js
- better-sqlite3 (driver SQLite)

### Initialization Commands

```bash
# Frontend
npm create vite@latest client -- --template vue

# Backend
mkdir server && cd server && npm init -y && npm install express better-sqlite3 cors
```

### Architectural Pattern

- Separación clara frontend/backend (no SSR)
- API REST simple
- Base de datos en archivo SQLite

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Stack: Vue 3 + Vite + Express + SQLite
- Sin autenticación (según PRD)

**Important Decisions (Shape Architecture):**
- API REST simple
- Sin state management complejo (ref/reactive nativo)

**Deferred Decisions (Post-MVP):**
- CI/CD
- Autenticación
- Migraciones

### Data Architecture

- **Database:** SQLite con better-sqlite3
- **Schema:** Archivo único, sin migraciones complejas
- **Validation:** basic server-side validation

### Authentication & Security

- **Sin autenticación** - acceso libre
- **CORS:** Configuración básica

### API & Communication Patterns

- **REST API simple** con endpoints CRUD
- **Endpoints:** /api/clientes, /api/productos, /api/entregas, /api/abonos
- **Sin OpenAPI** - mantener simple

### Frontend Architecture

- **Vue Router** - navegación
- **Sin Pinia/Vuex** - usar ref/reactive nativo
- **Componentes:** .vue simples

### Infrastructure & Deployment

- **Despliegue:** Manual
- **Sin CI/CD** - Post-MVP

## Implementation Patterns & Consistency Rules

### Naming Conventions

**Database:**
- Tablas: plural, snake_case (clientes, productos, entregas)
- Columnas: snake_case (fecha_entrega, precio_unitario)
- FK: snake_case (cliente_id, producto_id)

**API:**
- Endpoints: plural, snake_case (/api/clientes, /api/entregas)
- JSON: snake_case

**Code (Vue/JS):**
- Componentes: PascalCase (ClienteList.vue)
- Archivos: kebab-case (cliente-list.vue)
- Variables: camelCase

### Project Structure

```
/client (Vue)
  /src
    /components
    /views
    /services
    /router
/server (Node)
  /routes
  /db
  /index.js
```

### API Response Format

```json
// Success
{ "data": {...} }

// Error
{ "error": "mensaje" }
```

### Error Handling

- Errores: { error: "mensaje" }
- Status codes: 200, 201, 400, 404, 500

## Project Structure & Boundaries

### Complete Project Directory Structure

```
mary-tq/
├── client/                    # Vue 3 + Vite
│   ├── src/
│   │   ├── components/       # Componentes Vue
│   │   ├── views/           # Vistas/Páginas
│   │   ├── router/         # Vue Router
│   │   ├── services/       # Llamadas API
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                  # Node.js + Express + SQLite
    ├── routes/             # Endpoints API
    │   ├── clientes.js
    │   ├── productos.js
    │   ├── entregas.js
    │   └── abonos.js
    ├── db/
    │   └── database.js     # SQLite + better-sqlite3
    ├── index.js            # Entry point
    └── package.json
```

### Requirements to Structure Mapping

| FR Category | Location |
|-------------|----------|
| Clientes CRUD | client + server/routes/clientes.js |
| Productos CRUD | client + server/routes/productos.js |
| Entregas | client + server/routes/entregas.js |
| Abonos | client + server/routes/abonos.js |
| Dashboard | client/views + server aggregate queries |

### API Boundaries

- /api/clientes - CRUD clientes
- /api/productos - CRUD productos
- /api/entregas - CRUD entregas
- /api/abonos - CRUD abonos
- /api/dashboard - Métricas agregadas

## Architecture Validation Results

### Coherence Validation ✅

- Stack Vue + Node + SQLite: versiones compatibles
- Patrones de nomenclatura: coherentes en toda la arquitectura
- Estructura: aligned con decisiones técnicas

### Requirements Coverage Validation ✅

| Requisito | Soporte |
|-----------|---------|
| CRUD Clientes | ✅ /api/clientes |
| CRUD Productos | ✅ /api/productos |
| Entregas | ✅ /api/entregas |
| Abonos | ✅ /api/abonos |
| Dashboard | ✅ /api/dashboard |
| Sin Auth | ✅ Sin middleware |

### Implementation Readiness ✅

- Decisiones completas con versiones verificadas
- Estructura de proyecto completa y específica
- Patrones de implementación definidos con ejemplos

### Gap Analysis Results

- Sin gaps críticos identificados
- Proyecto listo para implementación

### Architecture Completeness Checklist

- [x] Project context analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Technology stack fully specified
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Complete directory structure defined
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**First Implementation Step:**
```bash
npm create vite@latest client -- --template vue
```

## Project Context Analysis

### Requirements Overview

**Functional Requirements (30 FRs):**
- Gestión de Clientes (FR1-5): CRUD + historial intacto
- Gestión de Productos (FR6-9): CRUD + no eliminación
- Gestión de Precios (FR10-13): precios por cliente-producto
- Gestión de Entregas (FR14-20): registro + cálculo automático de totales
- Gestión de Abonos (FR21-24): registro + aplicación a entregas
- Consulta Estados de Cuenta (FR25-27): saldos y detalle
- Dashboard y Reportes (FR28-30): métricas por cliente/producto

**Non-Functional Requirements:**
- Performance: CRUD <1s, consulta <5s, registro <60s
- Accessibility: WCAG Level A, responsive mobile-first

### Scale & Complexity

- **Primary domain:** Web App / SPA
- **Complexity level:** Low
- **Estimated components:** 5-7 entidades principales

### Technical Constraints & Dependencies

- Sin tiempo real (WebSockets)
- Sin SEO
- Sin integraciones externas en MVP
- Base de datos simple (SQLite)

### Cross-Cutting Concerns

- No eliminación de datos (historial intacto)
- Cálculos de saldos automáticos
- Validación de precios por cliente-producto
