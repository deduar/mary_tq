# Mary TQ - Control de Entregas

Sistema de control de entregas y pagos para negocio de productos artesanales.

## Características

- **Gestión de Clientes**: Registro y seguimiento de clientes
- **Gestión de Productos**: Catálogo de productos disponibles
- **Entregas**: Registro de entregas a clientes con productos y cantidades
- **Abonos/Pagos**: Registro de pagos y aplicación a entregas
- **Dashboard**: Gráfico de entregas y abonos (últimos 30 días)
- **PWA**: Instalable como app móvil

## Tech Stack

- **Frontend**: Vue 3 + Vite
- **Backend**: Node.js + Express
- **Base de datos**: SQLite
- **Charts**: Chart.js + vue-chartjs

## Ejecutar localmente

```bash
# Iniciar contenedores
docker compose up -d

# Acceder a la app
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

## Acceso desde móvil

1. Obtener IP de la PC: `hostname -I`
2. Acceder desde móvil: `http://<IP>:5173`
3. Instalar como PWA desde el navegador

## Estructura del proyecto

```
mary_tq/
├── client/               # Frontend Vue 3
│   ├── src/
│   │   ├── views/       # Vistas (Dashboard, Clientes, etc.)
│   │   ├── services/    # API calls
│   │   └── router/      # Rutas
│   └── dist/            # Build de producción
├── server/              # Backend Node.js
│   ├── routes/          # Endpoints API
│   ├── db/              # Base de datos SQLite
│   └── __tests__/       # Tests
├── docker-compose.yml
└── Dockerfile
```

## Rutas API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/clientes | Listar clientes |
| POST | /api/clientes | Crear cliente |
| GET | /api/clientes/:id | Detalle cliente |
| GET | /api/productos | Listar productos |
| POST | /api/productos | Crear producto |
| GET | /api/entregas | Listar entregas |
| POST | /api/entregas | Crear entrega |
| GET | /api/abonos | Listar abonos |
| POST | /api/abonos | Crear abono |
| POST | /api/abonos/:id/aplicar | Aplicar abono a entregas |
| GET | /api/dashboard/stats | Estadísticas dashboard |

## Desarrollo

```bash
# Rebuild y restart
docker compose down && docker compose build && docker compose up -d

# Ver logs
docker logs mary-tq-dev
```
