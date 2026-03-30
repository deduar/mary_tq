# Product Brief - Sistema de Control de Entregas

## 1. Resumen del Problema

Mary tiene un obradoiro (pequeña fábrica) de productos artesanales que distribuye a varios clientes (American Tropic, Zeus Cafe, etc.). Actualmente no tiene un sistema digital para registrar las entregas, lo que genera dificultad para:
- Registrar qué productos se entregó a cada cliente
- Controlar el saldo pendiente de pago por cliente
- Registrar abonos y conocer cuánto resta por cobrar
- Analizar el rendimiento por producto y cliente

## 2. Actors

### Primary Actor
- **Mary** (Owner): Usuario único del sistema. No requiere autenticación/login.

### Entidades del Sistema

| Entidad | Descripción | Comportamiento |
|---------|-------------|----------------|
| **Cliente** | Empresas que reciben productos de Mary | Lista dinámica, se agregan nuevos clientes según necesidad |
| **Producto** | Items artesanales (arepas, tequeños, pasteles de carne, etc.) | Lista fija pero modificable, se comparten entre clientes |
| **PrecioClienteProducto** | Relación many-to-many entre Cliente y Producto con precio específico | Define el precio unitario de cada producto por cliente |
| **Entrega** | Registro de productos entregados a un cliente | Fecha, lista de productos con cantidades y precios |
| **Abono** | Pago realizado por el cliente | Fecha, monto, puede asociarse a entregas específicas |

## 3. Modelo de Estados

### Cliente
- **Activo**: Cliente正常使用中
- No hay estado de "eliminado" - se mantiene historial

### Producto
- **Activo**: Producto disponible para entregas
- No hay estado de "eliminado" - se mantiene historial

### Entrega
- **Pendiente**: Entrega registrada, saldo pendiente de pago
- **ParcialmentePagada**:有一部分已付款但未完全付清
- **Pagada**: Saldo completamente cubierto por abonos
- **Cancelada**: Entrega cancelada (opcional para futura expansión)

### Abono
- **Aplicado**: Abono registrado y asociado a entregas
- **Disponible**: Abono disponible para aplicar a entregas futuras

## 4. Transiciones

### Registro de Entrega
```
Cliente → [seleccionar productos] → [ingresar cantidades] → [sistema calcula total] → [registrar entrega] → Entrega.Pendiente
```

### Registro de Abono
```
Cliente → [ingresar monto] → [fecha] → [asociar a entrega(s) o quedar disponible] →Abono.Aplicado
```

### Aplicación de Abono a Entrega
```
Abono.Disponible + Entrega.Pendiente → [seleccionar abonos a aplicar] → [sistema descuenta] → Entrega actualiza estado
```

## 5. Casos de Uso

### UC-001: Gestionar Clientes
- **Alta**: Agregar nuevo cliente con nombre
- **Consulta**: Ver lista de clientes
- **Modificación**: Editar nombre del cliente
- **Detalle**: Ver historial de entregas, abonos y saldo por cliente

### UC-002: Gestionar Productos
- **Alta**: Agregar nuevo producto (nombre, descripción opcional)
- **Consulta**: Ver lista de productos
- **Modificación**: Editar nombre/descripción del producto

### UC-003: Definir Precios por Cliente
- **Establecer**: Asignar precio a un producto para un cliente específico
- **Modificar**: Cambiar precio de un producto para un cliente
- **Consultar**: Ver lista de precios de un cliente

### UC-004: Registrar Entrega
- **Crear**: Seleccionar cliente, agregar productos (con cantidad), sistema calcula subtotal
- **Confirmar**: Registrar entrega con fecha actual (o fecha específica)
- **Resultado**: Se crea registro de entrega y se actualiza saldo pendiente del cliente

### UC-005: Registrar Abono
- **Crear**: Ingresar monto, fecha, cliente
- **Asociar**: Opcionalmente asociar a entregas específicas o dejar como crédito disponible
- **Resultado**: Se registra abono y se actualizan saldos de entregas asociadas

### UC-006: Consultar Saldo por Cliente
- **Ver saldo actual**: Total pendiente de pago de todas las entregas
- **Ver detalle**: Listado de entregas pendientes con sus respectivos saldos
- **Ver abonos**: Historial de abonos realizados

### UC-007: Dashboard Analítico
- **Por Cliente**: Total de entregas, total de abonos, saldo actual, período seleccionado
- **Por Producto**: Cantidad total entregada, ingreso generado por producto
- **Resumen General**: Total a cobrar, total cobrado en período

## 6. Reglas de Negocio

| Regla | Descripción |
|-------|-------------|
| RB-001 | Cada cliente tiene su propia lista de precios por producto |
| RB-002 | Los precios se definen a nivel de cliente-producto, no global |
| RB-003 | No se elimina información de clientes ni productos (historial intacto) |
| RB-004 | Moneda única: Euro (€) |
| RB-005 | El sistema no requiere conexión offline (siempre hay internet) |
| RB-006 | Sin autenticación - acceso libre para Mary |
| RB-007 | Dispositivo principal: celular |
| RB-008 | Una entrega puede tener múltiples productos |
| RB-009 | Un abono puede aplicarse a una o varias entregas |
| RB-010 | Un abono no aplicado queda como crédito a favor del cliente |

## 7. Flujo Principal (Happy Path)

```
1. Mary inicia la app
2. Si es cliente nuevo: registrar cliente (UC-001)
3. Si es producto nuevo: registrar producto (UC-002)
4. Si no hay precio para cliente-producto: establecer precio (UC-003)
5. Registrar entrega: seleccionar cliente → agregar productos → confirmar (UC-004)
6. Cuando cliente abona: registrar abono → opcionalmente aplicar a entregas (UC-005)
7. Consultar saldos y dashboard cuando necesite (UC-006, UC-007)
```

## 8. Requisitos No Funcionales

| Requisito | Descripción |
|-----------|-------------|
| RNF-001 | Interfaz optimizada para móvil (responsive design) |
| RNF-002 | Tiempo de respuesta rápido para operaciones CRUD básicas |
| RNF-003 | Almacenamiento persistente de todos los datos |
| RNF-004 | Backup de datos (considerar para posterior iteración) |

## 9. Supuestos

- El número de clientes y productos es manageable (no requieren paginación avanzada inicial)
- Mary conoce los precios de memoria al momento de registrar entregas
- No se requiere generar facturas formales en esta versión
- No hay prevista integración con otros sistemas en esta versión

## 10. Alcance - Version 1.0

### Incluido
- CRUD Clientes
- CRUD Productos
- Precios por cliente-producto
- Registro de Entregas
- Registro de Abonos
- Consulta de Saldos por cliente
- Dashboard básico (por cliente y por producto)

### Excluido (Versiones Futuras)
- Autenticación/Login
- Gestión de inventario
- Acceso para clientes
- Facturación formal
- Reportes avanzados
- Exportación de datos

---

*Documento generado en fase Discover-Define del Double Diamond. Sujeto a iteración y refinamiento.*
