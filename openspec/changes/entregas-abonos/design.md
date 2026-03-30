## Context

The initial project setup (Epic 1) implemented client and product management. Now we need to implement the core business functionality: registering deliveries (entregas) and payments (abonos). This is the heart of Mary's business - tracking what products were delivered to which clients and what payments have been made.

Current state: Clients and products can be created/managed. Database schema for deliveries and payments already exists.

## Goals / Non-Goals

**Goals:**
- Register deliveries with multiple products and quantities
- Automatic total calculation for deliveries
- Register payments from clients
- Apply payments to specific deliveries
- Automatic balance (saldo) calculation per client
- Track delivery payment status automatically

**Non-Goals:**
- Dashboard analytics (Epic 5 - future)
- Price management per client-product (Epic 2 - can be done in parallel)
- Export/Reports (future version)
- Offline mode (future version)

## Decisions

### 1. Delivery Registration Flow
- **Decision**: User selects client first, then adds products with quantities
- **Rationale**: Simpler UX for mobile. Prices are entered directly (no price lookup)
- **Alternative considered**: Require prices to be set first - adds complexity

### 2. Payment Application
- **Decision**: Allow payments to be applied immediately or kept as credit
- **Rationale**: Flexibility for Mary to handle different payment scenarios
- **Alternative considered**: Auto-apply to oldest first - less flexible

### 3. Balance Calculation
- **Decision**: Calculate saldo dynamically on client detail request
- **Rationale**: Simple to implement, handles edge cases naturally
- **Alternative considered**: Store calculated saldo - adds complexity for updates

### 4. Delivery Status
- **Decision**: Update status automatically based on payments applied
- **Rationale**: No manual status updates needed
- **Status logic**:
  - Total = 0 → "Pagada"
  - Applied = 0 → "Pendiente"
  - Otherwise → "ParcialmentePagada"

## Risks / Trade-offs

- **Risk**: Price entry errors → Wrong totals
  - **Mitigation**: Show confirmation with totals before saving
- **Risk**: Applying payment to wrong delivery
  - **Mitigation**: Allow viewing applied payments on delivery detail
- **Risk**: Large number of products in delivery
  - **Mitigation**: Scrollable list, mobile-friendly

## Migration Plan

1. Create API routes for entregas and abonos
2. Create frontend views and components
3. Update client detail to show deliveries and payments
4. Add navigation links
5. Test full flow: create delivery → register payment → apply to delivery → verify saldo
6. No database migration needed (tables already exist)
