---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# mary_tq - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for mary_tq, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Gestión de Clientes:**
- FR1: Usuario puede crear nuevo cliente con nombre
- FR2: Usuario puede listar todos los clientes
- FR3: Usuario puede modificar nombre de cliente
- FR4: Usuario puede ver detalle de cliente (entregas, abonos, saldo)
- FR5: Sistema no elimina clientes (historial intacto)

**Gestión de Productos:**
- FR6: Usuario puede crear nuevo producto con nombre
- FR7: Usuario puede listar todos los productos
- FR8: Usuario puede modificar nombre/descripción de producto
- FR9: Sistema no elimina productos (historial intacto)

**Gestión de Precios:**
- FR10: Usuario puede asignar precio a producto para cliente específico
- FR11: Usuario puede modificar precio de producto para cliente
- FR12: Usuario puede consultar lista de precios de un cliente
- FR13: Sistema valida que precio exista antes de registrar entrega

**Gestión de Entregas:**
- FR14: Usuario puede registrar entrega seleccionando cliente
- FR15: Usuario puede agregar múltiples productos a una entrega
- FR16: Usuario puede ingresar cantidad por producto
- FR17: Sistema calcula subtotal automáticamente
- FR18: Usuario puede registrar fecha de entrega
- FR19: Sistema actualiza saldo pendiente del cliente
- FR20: Sistema muestra estado de entrega (Pendiente/ParcialmentePagada/Pagada)

**Gestión de Abonos:**
- FR21: Usuario puede registrar abono con monto y fecha
- FR22: Usuario puede asociar abono a entregas específicas
- FR23: Usuario puede dejar abono como crédito disponible
- FR24: Sistema actualiza saldo de entregas asociadas

**Consulta de Estados de Cuenta:**
- FR25: Usuario puede ver saldo total pendiente de cliente
- FR26: Usuario puede ver detalle de entregas pendientes
- FR27: Usuario puede ver historial de abonos por cliente

**Dashboard y Reportes:**
- FR28: Usuario puede ver dashboard por cliente (entregas, abonos, saldo)
- FR29: Usuario puede ver dashboard por producto (cantidad, ingreso)
- FR30: Usuario puede ver resumen general (total por cobrar, total cobrado)

### NonFunctional Requirements

**Performance:**
- NFR1: Tiempo de respuesta operaciones CRUD < 1 segundo
- NFR2: Tiempo de consulta de saldos < 5 segundos
- NFR3: Registro de entrega completo < 60 segundos

**Accessibility:**
- NFR4: Cumplimiento WCAG Level A
- NFR5: Diseño responsive mobile-first
- NFR6: Navegación accesible en Chrome

### Additional Requirements

**From Architecture:**
- Starter Template: Vue 3 + Vite (frontend), Express + SQLite (backend)
- API REST simple con endpoints: /api/clientes, /api/productos, /api/entregas, /api/abonos, /api/dashboard
- Sin autenticación (acceso libre)
- Base de datos SQLite con better-sqlite3

### UX Design Requirements

No hay documento UX disponible actualmente.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

### Epic 1: Gestión de Entidades Base
Usuario puede gestionar clientes y productos del negocio
**FRs covered:** FR1-FR9 (CRUD clientes y productos)

### Epic 2: Gestión de Precios
Usuario puede definir precios por cliente-producto
**FRs covered:** FR10-FR13

### Epic 3: Registro de Entregas
Usuario puede registrar entregas y controlar saldos
**FRs covered:** FR14-FR20, FR25-FR26

### Epic 4: Gestión de Abonos
Usuario puede registrar pagos y aplicarlos a entregas
**FRs covered:** FR21-FR24, FR27

### Epic 5: Dashboard y Análisis
Usuario puede visualizar métricas del negocio
**FRs covered:** FR28-FR30

### FR Coverage Map

| FR | Epic |
|----|------|
| FR1-FR5 | Epic 1 - Gestión de Entidades Base |
| FR6-FR9 | Epic 1 - Gestión de Entidades Base |
| FR10-FR13 | Epic 2 - Gestión de Precios |
| FR14-FR20 | Epic 3 - Registro de Entregas |
| FR21-FR24 | Epic 4 - Gestión de Abonos |
| FR25-FR27 | Epic 3/4 - Consulta Estados |
| FR28-FR30 | Epic 5 - Dashboard y Análisis |

## Epic 1: Gestión de Entidades Base

Usuario puede gestionar clientes y productos del negocio
**FRs covered:** FR1-FR9

### Story 1.0: Configurar Proyecto Inicial

As a Desarrollador,
I want configurar el proyecto inicial con Vue 3 + Vite y Express + SQLite,
So that tenga la base lista para implementar las funcionalidades.

**Acceptance Criteria:**

**Given** Se inicia el desarrollo
**When** Se ejecutan los comandos de setup del proyecto
**Then** El proyecto frontend y backend están configurados
**And** Se puede ejecutar el servidor de desarrollo
**And** La API responde en los endpoints básicos

### Story 1.1: Crear Cliente

As a Usuario,
I want crear un nuevo cliente con nombre,
So that pueda registrar nuevos clientes en el sistema.

**Acceptance Criteria:**

**Given** El usuario está en la vista de clientes
**When** Ingresa el nombre del cliente y confirma
**Then** El sistema crea el cliente y lo muestra en la lista
**And** El cliente aparece con estado activo

### Story 1.2: Listar Clientes

As a Usuario,
I want ver lista de todos los clientes,
So that pueda seleccionar un cliente para trabajar.

**Acceptance Criteria:**

**Given** Existen clientes registrados
**When** El usuario navega a la lista de clientes
**Then** El sistema muestra todos los clientes ordenados alfabéticamente
**And** Cada cliente muestra nombre y fecha de creación

### Story 1.3: Modificar Cliente

As a Usuario,
I want editar el nombre de un cliente,
So that pueda corregir errores o actualizar información.

**Acceptance Criteria:**

**Given** El usuario está en el detalle de un cliente
**When** Modifica el nombre y confirma
**Then** El sistema actualiza el nombre del cliente
**And** Los cambios se reflejan inmediatamente

### Story 1.4: Ver Detalle Cliente

As a Usuario,
I want ver detalle de un cliente con sus entregas, abonos y saldo,
So that pueda consultar el estado completo de un cliente.

**Acceptance Criteria:**

**Given** El usuario selecciona un cliente
**When** Navega al detalle del cliente
**Then** El sistema muestra: nombre, lista de entregas, lista de abonos, saldo pendiente
**And** Las entregas muestran fecha, total y estado

### Story 1.5: Crear Producto

As a Usuario,
I want crear un nuevo producto,
So that pueda agregar productos al catálogo.

**Acceptance Criteria:**

**Given** El usuario está en la vista de productos
**When** Ingresa el nombre del producto y confirma
**Then** El sistema crea el producto y lo muestra en la lista

### Story 1.6: Listar Productos

As a Usuario,
I want ver lista de todos los productos,
So that pueda seleccionar productos para entregas.

**Acceptance Criteria:**

**Given** Existen productos registrados
**When** El usuario navega a la lista de productos
**Then** El sistema muestra todos los productos ordenados alfabéticamente
**And** Cada producto muestra nombre y descripción

### Story 1.7: Modificar Producto

As a Usuario,
I want editar nombre o descripción de un producto,
So that pueda mantener el catálogo actualizado.

**Acceptance Criteria:**

**Given** El usuario está en el detalle de un producto
**When** Modifica el nombre o descripción y confirma
**Then** El sistema actualiza el producto
**And** Los cambios se reflejan inmediatamente

## Epic 2: Gestión de Precios

Usuario puede definir precios por cliente-producto
**FRs covered:** FR10-FR13

### Story 2.1: Asignar Precio a Cliente-Producto

As a Usuario,
I want asignar un precio a un producto para un cliente específico,
So that cada cliente tenga sus propios precios.

**Acceptance Criteria:**

**Given** El usuario está en la vista de precios de un cliente
**When** Selecciona un producto e ingresa el precio y confirma
**Then** El sistema guarda el precio para esa combinación cliente-producto
**And** El precio queda disponible para usar en entregas

### Story 2.2: Modificar Precio

As a Usuario,
I want modificar el precio de un producto para un cliente,
So that pueda ajustar precios cuando sea necesario.

**Acceptance Criteria:**

**Given** Existe un precio asignado para cliente-producto
**When** El usuario modifica el precio y confirma
**Then** El sistema actualiza el precio
**And** Las nuevas entregas usarán el precio actualizado

### Story 2.3: Consultar Precios de Cliente

As a Usuario,
I want ver la lista de precios de un cliente,
So that pueda saber qué precios tiene asignados.

**Acceptance Criteria:**

**Given** El usuario está en el detalle de un cliente
**When** Navega a la sección de precios
**Then** El sistema muestra lista de productos con sus precios para ese cliente
**And** Los productos sin precio asignado se muestran claramente

## Epic 3: Registro de Entregas

Usuario puede registrar entregas y controlar saldos
**FRs covered:** FR14-FR20, FR25-FR26

### Story 3.1: Registrar Entrega

As a Usuario,
I want registrar una entrega seleccionando cliente y productos,
So that pueda controlar qué entrego a cada cliente.

**Acceptance Criteria:**

**Given** Existen clientes y productos registrados
**When** Selecciona un cliente, agrega productos y confirma
**Then** El sistema crea el registro de entrega
**And** El saldo del cliente se actualiza automáticamente

### Story 3.2: Agregar Múltiples Productos a Entrega

As a Usuario,
I want agregar múltiples productos con cantidades a una entrega,
So that pueda registrar entregas completas.

**Given** El usuario está registrando una entrega
**When** Agrega varios productos con sus cantidades
**Then** El sistema muestra todos los productos agregados
**And** Permite seguir agregando o confirmar la entrega

### Story 3.3: Calcular Total Automáticamente

As a Usuario,
I want que el sistema calcule el subtotal automáticamente,
So that no tenga que hacer cálculos manualmente.

**Given** Hay productos agregados a la entrega
**When** Se agregan o modifican cantidades
**Then** El sistema calcula el total automáticamente
**And** Se muestra el desglose por producto y el total

### Story 3.4: Registrar Fecha de Entrega

As a Usuario,
I want registrar la fecha de entrega,
So that tenga historial correcto.

**Given** El usuario está registrando una entrega
**When** Ingresa o selecciona la fecha de entrega
**Then** El sistema guarda la fecha con la entrega
**And** Por defecto usa la fecha actual

### Story 3.5: Actualizar Saldo Automáticamente

As a Usuario,
I want que el sistema actualice el saldo pendiente del cliente,
So that siempre tenga el saldo actualizado.

**Given** Se registra una nueva entrega
**When** La entrega se confirma
**Then** El sistema suma el total al saldo del cliente
**And** El saldo se refleja inmediatamente

### Story 3.6: Ver Estado de Entrega

As a Usuario,
I want ver el estado de una entrega (Pendiente/ParcialmentePagada/Pagada),
So that sepa qué entregas están pagadas y cuáles no.

**Given** El usuario visualiza una entrega
**When** Ve el detalle de la entrega
**Then** El sistema muestra el estado actual
**And** El estado cambia según abonos aplicados

### Story 3.7: Consultar Saldo de Cliente

As a Usuario,
I want ver el saldo total pendiente de un cliente,
So that sepa cuánto me debe.

**Given** El usuario selecciona un cliente
**When** Solicita ver el saldo
**Then** El sistema muestra el saldo total pendiente
**And** Se calcula como suma de entregas menos abonos

### Story 3.8: Ver Detalle Entregas Pendientes

As a Usuario,
I want ver detalle de las entregas pendientes de un cliente,
So that sepa exactamente qué falta por cobrar.

**Given** El usuario está en el detalle de un cliente
**When** Solicita ver entregas pendientes
**Then** El sistema lista las entregas con estado Pendiente o ParcialmentePagada
**And** Muestra fecha, total y saldo de cada entrega

## Epic 4: Gestión de Abonos

Usuario puede registrar pagos y aplicarlos a entregas
**FRs covered:** FR21-FR24, FR27

### Story 4.1: Registrar Abono

As a Usuario,
I want registrar un abono con monto y fecha,
So that pueda registrar los pagos de los clientes.

**Acceptance Criteria:**

**Given** El usuario está en la vista de abonos
**When** Ingresa monto, fecha, selecciona cliente y confirma
**Then** El sistema crea el registro de abono
**And** El abono queda disponible para aplicar

### Story 4.2: Aplicar Abono a Entregas

As a Usuario,
I want aplicar un abono a entregas específicas,
So that pueda reducir los saldos de las entregas.

**Given** Existe un abono disponible
**When** El usuario selecciona las entregas a aplicar
**Then** El sistema distribuye el abono entre las entregas
**And** El saldo de cada entrega se actualiza

### Story 4.3: Dejar Abono como Crédito

As a Usuario,
I want dejar un abono como crédito disponible,
So that quede para futuras entregas.

**Given** El usuario registra un abono
**When** No selecciona entregas específicas
**Then** El abono queda como crédito a favor del cliente
**And** Se aplicara automáticamente a futuras entregas

### Story 4.4: Actualizar Estado de Entrega

As a Usuario,
I want que el sistema actualice el estado de la entrega al aplicar abonos,
So that el estado refleje pagos realizados.

**Given** Se aplica un abono a una entrega
**When** El abono cubre parcial o totalmente el total
**Then** El sistema actualiza el estado (ParcialmentePagada o Pagada)
**And** El saldo pendiente se reduce соответственно

### Story 4.5: Ver Historial de Abonos

As a Usuario,
I want ver el historial de abonos de un cliente,
So that tenga registro de todos los pagos.

**Given** El usuario está en el detalle de un cliente
**When** Navega a la sección de abonos
**Then** El sistema muestra lista de todos los abonos
**And** Cada abono muestra fecha, monto y entregas aplicadas

## Epic 5: Dashboard y Análisis

Usuario puede visualizar métricas del negocio
**FRs covered:** FR28-FR30

### Story 5.1: Dashboard por Cliente

As a Usuario,
I want ver dashboard con entregas, abonos y saldo por cliente,
So that pueda analizar la relación con cada cliente.

**Acceptance Criteria:**

**Given** El usuario está en el dashboard
**When** Selecciona ver por cliente
**Then** El sistema muestra lista de clientes con: total entregas, total abonos, saldo actual
**And** Permite ordenar por cualquier métrica

### Story 5.2: Dashboard por Producto

As a Usuario,
I want ver dashboard con cantidad e ingreso por producto,
So that sepa qué productos son más populares.

**Acceptance Criteria:**

**Given** El usuario está en el dashboard
**When** Selecciona ver por producto
**Then** El sistema muestra lista de productos con: cantidad total entregada, ingreso generado
**And** Permite identificar productos más vendidos

### Story 5.3: Resumen General

As a Usuario,
I want ver resumen general con total por cobrar y total cobrado,
So that tenga visión del estado del negocio.

**Acceptance Criteria:**

**Given** El usuario abre el dashboard
**When** Visualiza el resumen general
**Then** El sistema muestra: total por cobrar, total cobrado, número de clientes, número de entregas
**And** Los valores se actualizan en tiempo real
