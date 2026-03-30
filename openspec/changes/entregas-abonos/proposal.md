## Why

Mary needs to register deliveries (entregas) of products to clients and track payments (abonos) to calculate balances owed. Currently, the system only manages clients and products - deliveries and payments are essential for the core business workflow.

## What Changes

- Implement delivery (entrega) registration with multiple products
- Add automatic total calculation for deliveries
- Implement payment (abono) registration
- Add ability to apply payments to specific deliveries
- Automatic balance (saldo) calculation per client
- Delivery status tracking (Pendiente, ParcialmentePagada, Pagada)
- Frontend views for delivery and payment management

## Capabilities

### New Capabilities
- `delivery-registration`: Register deliveries with client, products, quantities, automatic total calculation
- `payment-registration`: Register payments/abonos from clients
- `payment-application`: Apply payments to specific deliveries
- `balance-calculation`: Automatic saldo calculation based on deliveries minus payments
- `delivery-status`: Track delivery payment status (Pendiente/ParcialmentePagada/Pagada)

### Modified Capabilities
- (None - new capabilities only)

## Impact

- New API endpoints: `/api/entregas`, `/api/abonos`
- New frontend views: EntregaList, EntregaForm, AbonoList, AbonoForm
- Database tables already created: `entregas`, `entrega_producto`, `abonos`, `abono_entrega`
- Integration with existing client and product endpoints
