---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-core-experience
  - complete (simplified)
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
---

# UX Design Specification - mary_tq

**Author:** Edu
**Date:** 2026-03-28

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision
Sistema de control de entregas y deudas para obradoiro artesanal. Permite registrar entregas de productos a clientes, controlar saldos pendientes y visualizar métricas del negocio a través de dashboard.

### Target Users
- **Mary**: Dueña del obradoiro, única usuaria
- Sin conocimientos técnicos específicos
- Usará principalmente en móvil

### Key Design Challenges
- Interfaz optimizada para móvil (uso principal en celular)
- Flujos simples y rápidos (registro de entrega < 60s)
- Navegación intuitiva sin login
- Dashboard claro con información resumida

### Design Opportunities
- UI simple y funcional para negocio small
- Acceso rápido a información más importante (saldos)
- Diseño mobile-first

## Core User Experience

### Defining Experience
- **Core User Action:** Registrar entregas de productos a clientes (más frecuente)
- **Critical Action:** Control de saldos pendientes

### Platform Strategy
- Web App / PWA para móvil
- Principalmente touch en celular
- Sin necesidad de offline

### Effortless Interactions
- Registro de entrega rápido (< 60s)
- Ver saldo de cliente en un tap
- Dashboard con información resumida sin navegación compleja

### Critical Success Moments
- Registro de entrega fluido
- Consulta rápida de saldos
- Aplicación de abonos simple

### Experience Principles
1. **Simplicidad** - Todo en max 2-3 clics
2. **Velocidad** - Acciones principales en menos de 5 segundos
3. **Claridad** - Información clara y visible
4. **Mobile-first** - Diseñado primero para móvil

---

## UX Design Essentials

### Estructura de Vistas

```
/                   → Dashboard (Home)
/clientes           → Lista de clientes
/clientes/:id       → Detalle de cliente
/productos          → Lista de productos
/nueva-entrega      → Registrar entrega
/nuevo-abono        → Registrar abono
```

### Layout Principal

- **Header:** Logo + título + botón acción principal
- **Nav Bar (Bottom):** Dashboard | Clientes | Productos | +Nueva Entrega
- **Content:** Scrollable, padding 16px

### Components

| Component | Descripción |
|-----------|-------------|
| ClienteCard | Nombre, saldo pendiente, estado |
| ProductoCard | Nombre, precio (en contexto de cliente) |
| EntregaRow | Fecha, total, estado (badge) |
| AbonoRow | Fecha, monto |
| SaldoBadge | Verde si pagado, rojo si pendiente |
| FAB | Floating action button para acciones rápidas |

### Navigation

- Bottom navigation bar (4 items)
- Acceso rápido a "Nueva Entrega" siempre visible

### Responsive

- Mobile-first: 320px - 480px (principal)
- Tablet: 768px+ (adaptable)

---

## Lista de Vistas

### 1. Dashboard
- Cards resumidos: Total clientes, Total pendiente, Entregas hoy
- Lista rápida: Últimas entregas pendientes

### 2. Lista Clientes
- Search bar
- Lista de cards con nombre + saldo

### 3. Detalle Cliente
- Header: Nombre + saldo total
- Tabs: Entregas | Abonos | Precios

### 4. Lista Productos
- Grid 2 columnas
- Nombre + (precio en contexto)

### 5. Nueva Entrega
- Selector cliente
- Lista productos con cantidad
- Total calculado
- Botón confirmar

### 6. Nuevo Abono
- Selector cliente
- Input monto
- Selector entregas a aplicar
- Botón confirmar
