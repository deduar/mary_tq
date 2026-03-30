## 1. Backend API - Entregas

- [x] 1.1 Create GET /api/entregas endpoint (list all deliveries)
- [x] 1.2 Create GET /api/entregas/:id endpoint (get delivery detail)
- [x] 1.3 Create POST /api/entregas endpoint (create delivery)
- [x] 1.4 Create PUT /api/entregas/:id endpoint (update delivery)
- [x] 1.5 Test all entrega endpoints

## 2. Backend API - Abonos

- [x] 2.1 Create GET /api/abonos endpoint (list all payments)
- [x] 2.2 Create GET /api/abonos/:id endpoint (get payment detail)
- [x] 2.3 Create POST /api/abonos endpoint (create payment)
- [x] 2.4 Test all abono endpoints

## 3. Backend - Payment Application

- [x] 3.1 Create POST /api/abonos/:id/aplicar endpoint (apply payment to deliveries)
- [x] 3.2 Create GET /api/entregas/:id/pagos endpoint (get payments applied to delivery)
- [x] 3.3 Test payment application flow

## 4. Backend - Balance Calculation

- [x] 4.1 Update GET /api/clientes/:id to include entregas with status
- [x] 4.2 Update GET /api/clientes/:id to include applied abonos
- [x] 4.3 Ensure saldo calculation includes only applied payments
- [x] 4.4 Test balance calculation

## 5. Backend - Delivery Status

- [x] 5.1 Add function to calculate delivery status
- [x] 5.2 Update status automatically when payment applied
- [x] 5.3 Test status transitions

## 6. Frontend - Entrega Views

- [x] 6.1 Create EntregaList view (list deliveries)
- [x] 6.2 Create EntregaForm component (create delivery)
- [x] 6.3 Add client selector to EntregaForm
- [x] 6.4 Add product selector with quantity to EntregaForm
- [x] 6.5 Add price input and auto-calculate totals
- [x] 6.6 Create EntregaDetail view
- [x] 6.7 Connect entrega views to API

## 7. Frontend - Abono Views

- [x] 7.1 Create AbonoList view (list payments)
- [x] 7.2 Create AbonoForm component (create payment)
- [x] 7.3 Add ability to apply payment to deliveries
- [x] 7.4 Connect abono views to API

## 8. Frontend - Navigation

- [x] 8.1 Add navigation links for Entregas
- [x] 8.2 Add navigation links for Abonos
- [x] 8.3 Update router with new routes

## 9. Backend Tests - Entregas

- [x] 9.1 Write tests for GET /api/entregas
- [x] 9.2 Write tests for POST /api/entregas (create with products)
- [x] 9.3 Write tests for delivery total calculation
- [x] 9.4 Run tests and verify pass

## 10. Backend Tests - Abonos

- [x] 10.1 Write tests for GET /api/abonos
- [x] 10.2 Write tests for POST /api/abonos
- [x] 10.3 Write tests for applying payment to delivery
- [x] 10.4 Run tests and verify pass

## 11. Backend Tests - Balance & Status

- [x] 11.1 Write tests for saldo calculation
- [x] 11.2 Write tests for delivery status transitions
- [x] 11.3 Run tests and verify pass

## 12. Frontend Tests

- [x] 12.1 Write tests for EntregaList component
- [x] 12.2 Write tests for EntregaForm component
- [x] 12.3 Write tests for AbonoForm component
- [x] 12.4 Run tests and verify pass

## 13. Integration Testing

- [x] 13.1 Test: Create delivery → verify saldo increases
- [x] 13.2 Test: Create payment → apply to delivery → verify saldo decreases
- [x] 13.3 Test: Full flow - create client → create product → create delivery → create payment → apply → verify

## 14. Polish

- [x] 14.1 Add status indicators (colors) for delivery status
- [x] 14.2 Add error handling and user feedback
- [x] 14.3 Verify all specs requirements are met
