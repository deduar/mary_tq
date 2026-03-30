---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
status: completed
---
inputDocuments:
  - docs/product-brief.md
workflowType: 'prd'
classification:
  projectType: web_app
  domain: small_business
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - mary_tq

**Author:** Edu
**Date:** 2026-03-28

## Executive Summary

Sistema de gestión de entregas y deudas para pequeños negocios artesanales. Permite registrar entregas de productos a clientes, controlar saldos pendientes de pago y visualizar información a través de dashboards. Transforma el registro manual (papel/Excel) en información accesible instantáneamente.

**Usuario objetivo:** Pequeños negocios como obradurías que distribuyen productos a múltiples clientes y necesitan control de entregas y deudas.

**Problema resuelto:** Mary está superada por la cantidad de entregas y necesita llevar de forma clara, precisa y rápida las deudas con cada cliente.

### What Makes This Special

- **Simplicidad**: información disponible en todo momento
- **Dashboard**: resumen + detalle de clientes y entregas pendientes de pago
- **Control de deudas**: registro claro relacionado con entregas específicas
- **Respuesta a necesidad urgente**: volumen de entregas creciente

### Project Classification

- **Tipo de Proyecto**: Web App / PWA
- **Dominio**: Small Business - Gestión de entregas
- **Complejidad**: Low (baja)
- **Contexto**: Greenfield (nuevo producto)

## Success Criteria

### User Success

- Registrar entrega completa (múltiples productos) en menos de 1 minuto
- Consultar saldo de cliente en menos de 5 segundos
- Acceder a información desde móvil de forma intuitiva
- Ver dashboard con resumen de clientes y entregas pendientes en una pantalla

### Business Success

- 100% de entregas registradas digitalmente (vs papel/Excel)
- Control claro de deudas por cliente
- Visibilidad del estado financiero del negocio
- Soporte hasta 100 clientes y 50 productos

### Technical Success

- Interfaz optimizada para móvil (responsive design)
- Tiempo de respuesta operaciones CRUD < 1 segundo
- Tiempo de consulta de saldos < 5 segundos
- Almacenamiento persistente de datos

### Measurable Outcomes

| Métrica | Target |
|---------|--------|
| Tiempo registro entrega | < 60 segundos |
| Tiempo consulta saldo | < 5 segundos |
| Entregas registradas digitalmente | 100% |
| Uptime | 99% |

## Product Scope

### MVP - Minimum Viable Product

**Core User Journeys:**
- Registrar Nueva Entrega
- Consultar Saldo de Cliente
- Registrar Abono
- Revisar Dashboard

**Must-Have Capabilities:**
- CRUD Clientes
- CRUD Productos
- Precios por cliente-producto
- Registro de Entregas
- Registro de Abonos
- Consulta de Saldos por cliente
- Dashboard básico (por cliente y por producto)

### Phase 2 (Growth)

- Reportes avanzados
- Acceso para clientes
- Facturación formal
- Exportación de datos

### Phase 3 (Future)

- Múltiples usuarios/empleados
- Gestión de inventario
- Integraciones con otros sistemas
- Autenticación

## User Journeys

### Journey 1: Registrar Nueva Entrega

- **Opening**: Cliente hace pedido, Mary necesita registrar entrega
- **Rising Action**: Seleccionar cliente → agregar productos con cantidades → confirmar
- **Climax**: Entrega registrada, saldo actualizado automáticamente
- **Resolution**: Información disponible instantáneamente, sin papel

### Journey 2: Consultar Saldo de Cliente

- **Opening**: Mary necesita saber cuánto debe un cliente específico
- **Rising Action**: Navegar a lista clientes → seleccionar cliente → ver detalle
- **Climax**: Ver saldo total + detalle de entregas pendientes con montos
- **Resolution**: Conoce estado de deuda en < 5 segundos

### Journey 3: Registrar Abono

- **Opening**: Cliente paga (parcial o total)
- **Rising Action**: Ingresar monto → opcionalmente aplicar a entregas específicas → confirmar
- **Climax**: Abono registrado, saldos de entregas actualizados
- **Resolution**: Control claro de pagos y deudas

### Journey 4: Revisar Dashboard

- **Opening**: Mary quiere ver overview del negocio
- **Rising Action**: Abrir dashboard
- **Climax**: Ver resumen por cliente, por producto, total por cobrar/cobrado
- **Resolution**: Visibilidad completa del estado del negocio

### Journey Requirements Summary

- CRUD rápido de clientes/productos
- Flujo de registro de entregas optimizado para móvil
- Consulta de saldos con drill-down a detalle
- Registro de abonos con aplicación a entregas
- Dashboard con métricas clave

## Web App Specific Requirements

### Project-Type Overview

Web App tipo SPA para gestión interna de negocio. No requiere SEO, tiempo real ni características nativas. Optimizada para móvil con diseño responsive.

### Technical Architecture Considerations

- **Arquitectura**: SPA (Single Page Application)
- **Navegador objetivo**: Chrome
- **Diseño**: Responsive (mobile-first)
- **Accesibilidad**: WCAG Level A

### Implementation Considerations

- No se requiere SEO
- No se requiere WebSockets ni real-time
- Focus en usabilidad móvil

## Functional Requirements

### Gestión de Clientes

- FR1: Usuario puede crear nuevo cliente con nombre
- FR2: Usuario puede listar todos los clientes
- FR3: Usuario puede modificar nombre de cliente
- FR4: Usuario puede ver detalle de cliente (entregas, abonos, saldo)
- FR5: Sistema no elimina clientes (historial intacto)

### Gestión de Productos

- FR6: Usuario puede crear nuevo producto con nombre
- FR7: Usuario puede listar todos los productos
- FR8: Usuario puede modificar nombre/descripción de producto
- FR9: Sistema no elimina productos (historial intacto)

### Gestión de Precios

- FR10: Usuario puede asignar precio a producto para cliente específico
- FR11: Usuario puede modificar precio de producto para cliente
- FR12: Usuario puede consultar lista de precios de un cliente
- FR13: Sistema valida que precio exista antes de registrar entrega

### Gestión de Entregas

- FR14: Usuario puede registrar entrega seleccionando cliente
- FR15: Usuario puede agregar múltiples productos a una entrega
- FR16: Usuario puede ingresar cantidad por producto
- FR17: Sistema calcula subtotal automáticamente
- FR18: Usuario puede registrar fecha de entrega
- FR19: Sistema actualiza saldo pendiente del cliente
- FR20: Sistema muestra estado de entrega (Pendiente/ParcialmentePagada/Pagada)

### Gestión de Abonos

- FR21: Usuario puede registrar abono con monto y fecha
- FR22: Usuario puede asociar abono a entregas específicas
- FR23: Usuario puede dejar abono como crédito disponible
- FR24: Sistema actualiza saldo de entregas asociadas

### Consulta de Estados de Cuenta

- FR25: Usuario puede ver saldo total pendiente de cliente
- FR26: Usuario puede ver detalle de entregas pendientes
- FR27: Usuario puede ver historial de abonos por cliente

### Dashboard y Reportes

- FR28: Usuario puede ver dashboard por cliente (entregas, abonos, saldo)
- FR29: Usuario puede ver dashboard por producto (cantidad, ingreso)
- FR30: Usuario puede ver resumen general (total por cobrar, total cobrado)

## Non-Functional Requirements

### Performance

- Tiempo de respuesta operaciones CRUD < 1 segundo
- Tiempo de consulta de saldos < 5 segundos
- Registro de entrega completo < 60 segundos

### Accessibility

- Cumplimiento WCAG Level A
- Diseño responsive mobile-first
- Navegación accesible en Chrome
