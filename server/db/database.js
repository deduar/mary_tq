import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'database.sqlite')
const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      fecha_creacion TEXT NOT NULL,
      activo INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      fecha_creacion TEXT NOT NULL,
      activo INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS precios_cliente_producto (
      id TEXT PRIMARY KEY,
      cliente_id TEXT NOT NULL,
      producto_id TEXT NOT NULL,
      precio REAL NOT NULL,
      fecha_inicio TEXT NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    );

    CREATE TABLE IF NOT EXISTS entregas (
      id TEXT PRIMARY KEY,
      cliente_id TEXT NOT NULL,
      fecha TEXT NOT NULL,
      total REAL NOT NULL DEFAULT 0,
      estado TEXT NOT NULL DEFAULT 'Pendiente',
      fecha_creacion TEXT NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS entrega_producto (
      id TEXT PRIMARY KEY,
      entrega_id TEXT NOT NULL,
      producto_id TEXT NOT NULL,
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (entrega_id) REFERENCES entregas(id),
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    );

    CREATE TABLE IF NOT EXISTS abonos (
      id TEXT PRIMARY KEY,
      cliente_id TEXT NOT NULL,
      monto REAL NOT NULL,
      fecha TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'Disponible',
      fecha_creacion TEXT NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS abono_entrega (
      id TEXT PRIMARY KEY,
      abono_id TEXT NOT NULL,
      entrega_id TEXT NOT NULL,
      monto_aplicado REAL NOT NULL,
      FOREIGN KEY (abono_id) REFERENCES abonos(id),
      FOREIGN KEY (entrega_id) REFERENCES entregas(id)
    );
  `)
}

initializeDatabase()

export default db
