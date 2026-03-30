import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../db/database.js'

const router = express.Router()

function calculateDeliveryStatus(entregaId) {
  const entrega = db.prepare('SELECT total FROM entregas WHERE id = ?').get(entregaId)
  if (!entrega) return 'Pendiente'
  
  const applied = db.prepare(`
    SELECT COALESCE(SUM(monto_aplicado), 0) as total
    FROM abono_entrega
    WHERE entrega_id = ?
  `).get(entregaId)
  
  if (applied.total === 0) return 'Pendiente'
  if (applied.total >= entrega.total) return 'Pagada'
  return 'ParcialmentePagada'
}

router.get('/', (req, res) => {
  try {
    const entregas = db.prepare(`
      SELECT e.id, e.cliente_id, c.nombre as cliente_nombre, e.fecha, e.total, e.estado
      FROM entregas e
      LEFT JOIN clientes c ON e.cliente_id = c.id
      ORDER BY e.fecha DESC
    `).all()
    res.json({ data: entregas })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const entrega = db.prepare(`
      SELECT e.*, c.nombre as cliente_nombre
      FROM entregas e
      LEFT JOIN clientes c ON e.cliente_id = c.id
      WHERE e.id = ?
    `).get(req.params.id)

    if (!entrega) {
      return res.status(404).json({ error: 'Entrega no encontrada' })
    }

    const productos = db.prepare(`
      SELECT ep.*, p.nombre as producto_nombre
      FROM entrega_producto ep
      LEFT JOIN productos p ON ep.producto_id = p.id
      WHERE ep.entrega_id = ?
    `).all(req.params.id)

    const abonos = db.prepare(`
      SELECT ae.*, a.fecha as abono_fecha
      FROM abono_entrega ae
      LEFT JOIN abonos a ON ae.abono_id = a.id
      WHERE ae.entrega_id = ?
    `).all(req.params.id)

    res.json({ data: { ...entrega, productos, abonos } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', (req, res) => {
  try {
    const { cliente_id, fecha, productos } = req.body

    if (!cliente_id) {
      return res.status(400).json({ error: 'El cliente es requerido' })
    }

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'Debe agregar al menos un producto' })
    }

    const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(cliente_id)
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    const id = uuidv4()
    const fechaEntrega = fecha || new Date().toISOString()
    const fechaCreacion = new Date().toISOString()

    let total = 0
    const entregaProductos = productos.map(p => {
      const subtotal = p.cantidad * p.precio
      total += subtotal
      return {
        id: uuidv4(),
        entrega_id: id,
        producto_id: p.producto_id,
        cantidad: p.cantidad,
        precio_unitario: p.precio,
        subtotal
      }
    })

    db.prepare(`
      INSERT INTO entregas (id, cliente_id, fecha, total, estado, fecha_creacion)
      VALUES (?, ?, ?, ?, 'Pendiente', ?)
    `).run(id, cliente_id, fechaEntrega, total, fechaCreacion)

    const insertProducto = db.prepare(`
      INSERT INTO entrega_producto (id, entrega_id, producto_id, cantidad, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    for (const ep of entregaProductos) {
      insertProducto.run(ep.id, ep.entrega_id, ep.producto_id, ep.cantidad, ep.precio_unitario, ep.subtotal)
    }

    const created = db.prepare(`
      SELECT e.*, c.nombre as cliente_nombre
      FROM entregas e
      LEFT JOIN clientes c ON e.cliente_id = c.id
      WHERE e.id = ?
    `).get(id)

    res.status(201).json({ data: created })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', (req, res) => {
  try {
    const { fecha, estado } = req.body

    const existing = db.prepare('SELECT * FROM entregas WHERE id = ?').get(req.params.id)
    if (!existing) {
      return res.status(404).json({ error: 'Entrega no encontrada' })
    }

    const updates = []
    const params = []

    if (fecha) {
      updates.push('fecha = ?')
      params.push(fecha)
    }
    if (estado) {
      updates.push('estado = ?')
      params.push(estado)
    }

    if (updates.length > 0) {
      params.push(req.params.id)
      db.prepare(`UPDATE entregas SET ${updates.join(', ')} WHERE id = ?`).run(...params)
    }

    const entrega = db.prepare(`
      SELECT e.*, c.nombre as cliente_nombre
      FROM entregas e
      LEFT JOIN clientes c ON e.cliente_id = c.id
      WHERE e.id = ?
    `).get(req.params.id)

    res.json({ data: entrega })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id/pagos', (req, res) => {
  try {
    const abonos = db.prepare(`
      SELECT ae.*, a.fecha as abono_fecha, a.monto as monto_total
      FROM abono_entrega ae
      LEFT JOIN abonos a ON ae.abono_id = a.id
      WHERE ae.entrega_id = ?
    `).all(req.params.id)

    res.json({ data: abonos })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
