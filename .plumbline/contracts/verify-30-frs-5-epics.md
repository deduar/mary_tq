---
task: "Verify all 30 FRs across 5 epics are correctly implemented"
sources:
  - type: docs
    paths: ["_bmad-output/planning-artifacts/prd.md", "_bmad-output/planning-artifacts/architecture.md", "_bmad-output/planning-artifacts/epics.md"]
  - type: docs
    paths: ["openspec/changes/entregas-abonos/proposal.md", "openspec/changes/entregas-abonos/specs/delivery-registration/spec.md", "openspec/changes/entregas-abonos/specs/payment-registration/spec.md", "openspec/changes/entregas-abonos/specs/balance-calculation/spec.md"]
  - type: codebase
    paths: ["server/routes/clientes.js", "server/routes/productos.js", "server/routes/entregas.js", "server/routes/abonos.js", "server/db/database.js"]
  - type: domain
    queries: []
created: 2026-04-03
status: failed
report: verify-30-frs-5-epics-report.md
---

# Verification Contract: Verify all 30 FRs across 5 epics

## Context

This contract verifies that the Mary TQ project implementation aligns with the PRD requirements and design decisions. The verification focuses on functional correctness (30 FRs), code quality (architecture patterns), and contextual alignment (database schema, API contracts).

**Project:** Mary TQ - Sistema de control de entregas y pagos  
**Scope:** All 5 epics (Clientes, Productos, Precios, Entregas, Abonos, Dashboard)  
**Tech stack:** Vue 3 + Vite, Node.js + Express, SQLite + better-sqlite3

## Functional Verification

### Epic 1 - Gestión de Entidades Base (FR1-FR9)

- [ ] `[auto]` FR1: POST /api/clientes creates new client with name
  <!-- verify: grep -E "router\.post\('\/'" server/routes/clientes.js | grep -q "cliente" && echo "PASS" -->
- [ ] `[auto]` FR2: GET /api/clientes returns all clients
  <!-- verify: read server/routes/clientes.js line 7-21 - should have GET / endpoint returning clientes -->
- [ ] `[auto]` FR3: PUT /api/clientes/:id updates client name
  <!-- verify: read server/routes/clientes.js line 107-129 - should have PUT route -->
- [ ] `[auto]` FR4: GET /api/clientes/:id returns client detail with entregas, abonos, saldo
  <!-- verify: read server/routes/clientes.js line 24-82 - query includes entregas, abonos, saldo -->
- [ ] `[auto]` FR5: Sistema no elimina clientes (soft delete via activo flag)
  <!-- verify: grep -E "UPDATE.*activo" server/routes/clientes.js | head -1 -->
- [ ] `[auto]` FR6: POST /api/productos creates new product
  <!-- verify: read server/routes/productos.js line 39-60 -->
- [ ] `[auto]` FR7: GET /api/productos returns all products
  <!-- verify: read server/routes/productos.js line 7-18 -->
- [ ] `[auto]` FR8: PUT /api/productos/:id updates product
  <!-- verify: read server/routes/productos.js line 62-84 -->
- [ ] `[auto]` FR9: Sistema no elimina productos (soft delete)
  <!-- verify: grep -E "UPDATE.*activo" server/routes/productos.js | head -1 -->

### Epic 2 - Gestión de Precios (FR10-FR13)

- [ ] `[auto]` FR10: User can assign price to product for client
  <!-- verify: read server/db/database.js line 30-38 - table precios_cliente_producto exists -->
- [ ] `[auto]` FR11: User can modify price for client
  <!-- verify: grep -E "precios_cliente_producto" server/routes/*.js | head -3 -->
- [ ] `[auto]` FR12: User can query client prices
  <!-- verify: read server/routes/clientes.js line 36-44 - should include entregas with estado -->
- [ ] `[auto]` FR13: System validates price exists before registering delivery
  <!-- verify: read server/routes/entregas.js line 81 - validates cliente exists, but check if price validation exists -->

### Epic 3 - Registro de Entregas (FR14-FR20)

- [ ] `[auto]` FR14: POST /api/entregas creates delivery with client
  <!-- verify: read server/routes/entregas.js line 69-129 - creates entrega with cliente_id -->
- [ ] `[auto]` FR15: Delivery supports multiple products
  <!-- verify: read server/routes/entregas.js line 91-102 - maps productos array -->
- [ ] `[auto]` FR16: User enters quantity per product
  <!-- verify: read server/routes/entregas.js line 98 - cantidad field in entrega_producto -->
- [ ] `[auto]` FR17: System calculates subtotal automatically
  <!-- verify: read server/routes/entregas.js line 92 - subtotal = cantidad * precio -->
- [ ] `[auto]` FR18: User can register delivery date
  <!-- verify: read server/routes/entregas.js line 87 - fecha parameter -->
- [ ] `[auto]` FR19: System updates client saldo automatically
  <!-- verify: read server/routes/clientes.js line 56-69 - saldo calculation in GET /:id -->
- [ ] `[auto]` FR20: System shows delivery status (Pendiente/ParcialmentePagada/Pagada)
  <!-- verify: read server/routes/entregas.js line 7-20 - calculateDeliveryStatus function -->

### Epic 4 - Gestión de Abonos (FR21-FR24)

- [ ] `[auto]` FR21: POST /api/abonos creates abono with monto and fecha
  <!-- verify: read server/routes/abonos.js line 59-96 -->
- [ ] `[auto]` FR22: User can associate abono to specific entregas
  <!-- verify: read server/routes/abonos.js line 98-169 - POST /:id/aplicar endpoint -->
- [ ] `[auto]` FR23: User can leave abono as available credit
  <!-- verify: read server/routes/abonos.js line 82 - default estado 'Disponible' -->
- [ ] `[auto]` FR24: System updates delivery saldo when abono applied
  <!-- verify: read server/routes/abonos.js line 139-145 - updates entrega estado -->

### Epic 5 - Dashboard y Análisis (FR28-FR30)

- [ ] `[auto]` FR28: Dashboard shows client summary (entregas, abonos, saldo)
  <!-- verify: read server/routes/clientes.js line 7-21 - includes saldo calculation in list -->
- [ ] `[auto]` FR29: Dashboard shows product metrics (quantity, income)
  <!-- verify: grep -E "dashboard" server/routes/*.js | head -2 -->
- [ ] `[auto]` FR30: Dashboard shows general summary (total por cobrar, total cobrado)
  <!-- verify: glob server/routes/dashboard.js exists -->

### Additional FRs - Estados de Cuenta (FR25-FR27)

- [ ] `[auto]` FR25: User can view client total pending balance
  <!-- verify: read server/routes/clientes.js line 56-69 - saldo calculation -->
- [ ] `[auto]` FR26: User can view pending deliveries detail
  <!-- verify: read server/routes/clientes.js line 36-44 - entregas query returns all with aplicado -->
- [ ] `[auto]` FR27: User can view payment history by client
  <!-- verify: read server/routes/clientes.js line 46-54 - abonos query -->

## Craft Verification

- [ ] `[auto]` API response format matches architecture spec ({ data: ... } or { error: ... })
  <!-- verify: grep -E "res\.json\({ (data|error)" server/routes/*.js | head -5 -->
- [ ] `[auto]` Database uses snake_case naming (clientes, entrega_producto, fecha_creacion)
  <!-- verify: read server/db/database.js line 14-79 - table and column naming -->
- [ ] `[auto]` API endpoints use plural naming (/api/clientes, /api/entregas)
  <!-- verify: grep -E "router\.(get|post|put|delete)\('\/'" server/routes/*.js | head -10 -->
- [ ] `[auto]` Error handling returns proper status codes (400, 404, 500)
  <!-- verify: grep -E "res\.status\([0-9]" server/routes/*.js | head -8 -->
- [ ] `[auto]` Input validation present (nombre required, monto > 0)
  <!-- verify: grep -E "if \(!" server/routes/*.js | head -10 -->
- [ ] `[manual]` Code follows consistent patterns (error handling, DB queries)
  <!-- rubric:
  4: All routes use consistent try-catch, parameterized queries, and response format
  3: Most routes follow patterns with minor deviations
  2: Inconsistent patterns in error handling or query construction
  1: No recognizable pattern - chaotic implementation
  threshold: 3
  -->

## Contextual Verification

- [ ] `[auto]` Database schema includes all required tables
  <!-- verify: read server/db/database.js - clientes, productos, precios_cliente_producto, entregas, entrega_producto, abonos, abono_entrega -->
- [ ] `[auto]` Foreign key relationships properly defined
  <!-- verify: grep -E "FOREIGN KEY" server/db/database.js | wc -l (should be 6+) -->
- [ ] `[auto]` Saldo calculation includes only applied payments
  <!-- verify: read server/routes/clientes.js line 62-69 - uses abono_entrega, not raw abonos -->
- [ ] `[auto]` Delivery status transitions are correct (Pendiente -> ParcialmentePagada -> Pagada)
  <!-- verify: read server/routes/entregas.js line 17-19 - status logic -->
- [ ] `[auto]` Payment application respects client ownership (can only apply to own deliveries)
  <!-- verify: read server/routes/abonos.js line 123 - validates entrega.cliente_id -->
- [ ] `[auto]` Soft delete implemented (activo flag instead of DELETE)
  <!-- verify: grep -E "WHERE activo = 1" server/routes/clientes.js | head -3 -->