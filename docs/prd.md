# Product Requirements Document (PRD)

**Proyecto:** Sistema de Control de Entregas - Mary  
**Versión:** 1.0  
**Estado:** Draft  
**Metodología:** BMAD  
**Fecha:** 2026-03-28

---

## 1. Executive Summary

Mary es la dueño de un obradoiro (pequeña fábrica) de productos artesanales que distribuye a múltiples clientes (American Tropic, Zeus Cafe, etc.). Necesita un sistema digital para:
- Registrar entregas de productos a clientes con fecha, cantidad y tipo
- Controlar saldos pendientes de pago por cliente
- Registrar abonos y conocer el monto restante
- Analizar rendimiento por producto y cliente

**Usuario Principal:** Mary (única usuaria, sin autenticación)  
**Plataforma:** Web/Móvil (PWA)  
**Moneda:** Euro (€)

---

## 2. Problem Statement

Actualmente Mary gestiona las entregas de forma manual (posiblemente papel o Excel), lo que genera:
- Dificultad para consultar historial de entregas por cliente
- Falta de visibilidad del saldo pendiente por cobrar
- Imposibilidad de analizar qué productos son más demandados
- Riesgo de pérdida de información

---

## 3. Goals & KPIs

| Goal | Métrica | Target |
|------|---------|--------|
| Registrar todas las entregas | % entregas registradas digitalmente | 100% |
| Controlar saldos | Tiempo de consulta de saldo | < 5 segundos |
| Analítica básica | Dashboard disponible | Sí |
| Accesibilidad | Uso en dispositivo móvil | 100% |

---

## 4. Functional Requirements

### FR-001: Gestión de Clientes

**Descripción:** El sistema debe permitir crear, consultar, modificar y visualizar clientes.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-001.1 | Crear nuevo cliente con nombre | Must |
| FR-001.2 | Listar todos los clientes | Must |
| FR-001.3 | Modificar nombre de cliente | Should |
| FR-001.4 | Ver detalle de cliente (entregas, abonos, saldo) | Must |
| FR-001.5 | No eliminar clientes (historial intacto) | Must |

### FR-002: Gestión de Productos

**Descripción:** El sistema debe permitir gestionar el catálogo de productos.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-002.1 | Crear nuevo producto con nombre | Must |
| FR-002.2 | Listar todos los productos | Must |
| FR-002.3 | Modificar nombre/descripción de producto | Should |
| FR-002.4 | No eliminar productos (historial intacto) | Must |

### FR-003: Gestión de Precios por Cliente

**Descripción:** Cada cliente tiene precios específicos por producto.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-003.1 | Asignar precio a producto para cliente específico | Must |
| FR-003.2 | Modificar precio de producto para cliente | Must |
| FR-003.3 | Consultar lista de precios de un cliente | Must |
| FR-003.4 | Validar que precio existe antes de registrar entrega | Must |

### FR-004: Registro de Entregas

**Descripción:** Registrar entregas de productos a clientes.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-004.1 | Seleccionar cliente para entrega | Must |
| FR-004.2 | Agregar múltiples productos a una entrega | Must |
| FR-004.3 | Ingresar cantidad por producto | Must |
| FR-004.4 | Sistema calcula subtotal automáticamente | Must |
| FR-004.5 | Registrar fecha de entrega (actual o específica) | Must |
| FR-004.6 | Crear registro de entrega | Must |
| FR-004.7 | Actualizar saldo pendiente del cliente | Must |
| FR-004.8 | Estados: Pendiente, ParcialmentePagada, Pagada | Must |

### FR-005: Registro de Abonos

**Descripción:** Registrar pagos realizados por clientes.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-005.1 | Registrar abono con monto y fecha | Must |
| FR-005.2 | Asociar abono a entregas específicas | Should |
| FR-005.3 | Dejar abono como crédito disponible | Should |
| FR-005.4 | Actualizar saldo de entregas asociadas | Must |
| FR-005.5 | Estados: Aplicado, Disponible | Must |

### FR-006: Consulta de Saldos

**Descripción:** Consultar estado de cuenta por cliente.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-006.1 | Ver saldo total pendiente de cliente | Must |
| FR-006.2 | Ver detalle de entregas pendientes | Must |
| FR-006.3 | Ver historial de abonos por cliente | Must |
| FR-006.4 | Filtrar por período de tiempo | Should |

### FR-007: Dashboard Analítico

**Descripción:** Proporcionar vista resumida de información clave.

| ID | Requisito | Prioridad |
|----|------------|-----------|
| FR-007.1 | Dashboard por cliente (entregas, abonos, saldo) | Must |
| FR-007.2 | Dashboard por producto (cantidad, ingreso) | Must |
| FR-007.3 | Resumen general (total por cobrar, total cobrado) | Must |
| FR-007.4 | Filtrar dashboard por período | Should |

---

## 5. Non-Functional Requirements

### RNF-001: Rendimiento

| Requisito | Criterio |
|-----------|----------|
| Tiempo de carga inicial | < 3 segundos |
| Respuesta operaciones CRUD | < 1 segundo |
| Consultas de saldo | < 5 segundos |

### RNF-002: Usabilidad

| Requisito | Criterio |
|-----------|----------|
| Diseño móvil primero | UI optimizada para celular |
| Navegación intuitiva | Max 3 clics para cualquier acción |
| Feedback visual | Confirmación de acciones exitosas |

### RNF-003: Disponibilidad

| Requisito | Criterio |
|-----------|----------|
| Conectividad | Requiere conexión a internet |
| Uptime | 99% en horas de operación |

### RNF-004: Mantenibilidad

| Requisito | Criterio |
|-----------|----------|
| Código limpio | Estructura modular |
| Documentación | Comentarios en puntos complejos |

### RNF-005: Escalabilidad

| Requisito | Criterio |
|-----------|----------|
| Capacidad inicial | Soporte hasta 100 clientes, 50 productos |
| Crecimiento | Arquitectura que permita escalar |

---

## 6. Data Model

### Entidades Principales

```
Cliente
├── id: UUID
├── nombre: string
├── fecha_creacion: datetime
└── activo: boolean (siempre true)

Producto
├── id: UUID
├── nombre: string
├── descripcion: string (optional)
├── fecha_creacion: datetime
└── activo: boolean (siempre true)

PrecioClienteProducto
├── id: UUID
├── cliente_id: FK
├── producto_id: FK
├── precio: decimal
└── fecha_inicio: datetime

Entrega
├── id: UUID
├── cliente_id: FK
├── fecha: datetime
├── total: decimal
├── estado: enum (Pendiente, ParcialmentePagada, Pagada, Cancelada)
└── fecha_creacion: datetime

EntregaProducto
├── id: UUID
├── entrega_id: FK
├── producto_id: FK
├── cantidad: integer
├── precio_unitario: decimal
└── subtotal: decimal

Abono
├── id: UUID
├── cliente_id: FK
├── monto: decimal
├── fecha: datetime
├── estado: enum (Aplicado, Disponible)
└── fecha_creacion: datetime

AbonoEntrega (tabla relacional many-to-many)
├── abono_id: FK
├── entrega_id: FK
└── monto_aplicado: decimal
```

---

## 7. User Flows

### Flujo 1: Registrar Nueva Entrega

```
1. Mary inicia sesión (sin auth)
2. Navega a "Nueva Entrega"
3. Selecciona cliente de lista
4. Sistema verifica precios existen → si no, alerta
5. Agrega productos:
   a. Selecciona producto
   b. Ingresa cantidad
   c. Sistema muestra precio y subtotal
6. Repite paso 5 para más productos
7. Sistema muestra total de entrega
8. Confirma entrega
9. Sistema registra entrega y actualiza saldo
10. Muestra confirmación
```

### Flujo 2: Registrar Abono

```
1. Mary navega a "Nuevo Abono"
2. Selecciona cliente
3. Ingresa monto
4. Ingresa fecha
5. Opcional: selecciona entregas a aplicar
6. Confirma abono
7. Sistema actualiza saldos de entregas
8. Muestra confirmación
```

### Flujo 3: Consultar Saldo

```
1. Mary navega a "Clientes"
2. Selecciona cliente
3. Ve:
   - Saldo total pendiente
   - Listado de entregas con estado
   - Historial de abonos
4. Opcional: filtra por fecha
```

---

## 8. Epics & User Stories

### EPIC-001: Gestión de Entidades Base

**Descripción:** CRUD de clientes, productos y precios.

| Story ID | Título | Prioridad |
|----------|--------|-----------|
| US-001 | Crear cliente | Must |
| US-002 | Listar clientes | Must |
| US-003 | Ver detalle de cliente | Must |
| US-004 | Editar cliente | Should |
| US-005 | Crear producto | Must |
| US-006 | Listar productos | Must |
| US-007 | Editar producto | Should |
| US-008 | Asignar precio a cliente-producto | Must |
| US-009 | Editar precio de cliente-producto | Must |
| US-010 | Ver precios de cliente | Must |

### EPIC-002: Gestión de Entregas

**Descripción:** Registro y seguimiento de entregas.

| Story ID | Título | Prioridad |
|----------|--------|-----------|
| US-011 | Crear entrega con un producto | Must |
| US-012 | Crear entrega con múltiples productos | Must |
| US-013 | Ver lista de entregas por cliente | Must |
| US-014 | Ver detalle de entrega | Must |
| US-015 | Consultar estado de entrega | Must |

### EPIC-003: Gestión de Abonos

**Descripción:** Registro y aplicación de abonos.

| Story ID | Título | Prioridad |
|----------|--------|-----------|
| US-016 | Registrar abono | Must |
| US-017 | Aplicar abono a entrega | Must |
| US-018 | Dejar abono como crédito | Should |
| US-019 | Ver abonos por cliente | Must |

### EPIC-004: Consulta y Análisis

**Descripción:** Vistas de saldos y dashboards.

| Story ID | Título | Prioridad |
|----------|--------|-----------|
| US-020 | Consultar saldo de cliente | Must |
| US-021 | Ver detalle de saldo | Must |
| US-022 | Dashboard por cliente | Must |
| US-023 | Dashboard por producto | Must |
| US-024 | Dashboard general | Must |
| US-025 | Filtrar por período | Should |

---

## 9. Tech Stack Sugerido (No Restrictivo)

| Componente | Tecnología Sugerida |
|------------|---------------------|
| Frontend | React + TypeScript (PWA) |
| Backend | Node.js o Python |
| Base de datos | SQLite3 (v1) |
| Despliegue | Vercel / Netlify / Railway |

*Nota: La tecnología puede refinarse en fase de Arquitectura.*

---

## 10. Risks & Mitigations

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|-------------|
| Cambios en requisitos de precios | Media | Alto | Validar con usuario frecuentemente |
| Volumen mayor al esperado | Baja | Medio | Diseño modular permite escalar |
| Pérdida de datos | Baja | Crítico | Backup regular (v1.0 manual) |

---

## 11. Dependencies

- Ninguna dependencia externa para v1.0
- Considerar después: autenticación, exportación, multi-usuario

---

## 12. Out of Scope (v1.0)

- Autenticación/Login
- Gestión de inventario
- Acceso para clientes
- Facturación formal
- Reportes avanzados
- Exportación de datos
- Notificaciones
- Offline mode

---

## 13. Approval

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Product Manager | | | |
| Cliente | | | |

---

*Documento generado según metodología BMAD. Sujeto a revisión y aprobación.*
