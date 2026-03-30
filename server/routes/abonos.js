import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../db/database.js'

const router = express.Router()

router.get('/', (req, res) => {
  try {
    const abonos = db.prepare(`
      SELECT a.id, a.cliente_id, c.nombre as cliente_nombre, a.monto, a.fecha, a.estado
      FROM abonos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      ORDER BY a.fecha DESC
    `).all()
    res.json({ data: abonos })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const abono = db.prepare(`
      SELECT a.*, c.nombre as cliente_nombre
      FROM abonos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?
    `).get(req.params.id)

    if (!abono) {
      return res.status(404).json({ error: 'Abono no encontrado' })
    }

    const aplicaciones = db.prepare(`
      SELECT ae.*, e.fecha as entrega_fecha, e.total as entrega_total
      FROM abono_entrega ae
      LEFT JOIN entregas e ON ae.entrega_id = e.id
      WHERE ae.abono_id = ?
    `).all(req.params.id)

    const totalAplicado = db.prepare(`
      SELECT COALESCE(SUM(monto_aplicado), 0) as total
      FROM abono_entrega
      WHERE abono_id = ?
    `).get(req.params.id)

    res.json({ 
      data: { 
        ...abono, 
        aplicaciones,
        disponible: abono.monto - totalAplicado.total
      } 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', (req, res) => {
  try {
    const { cliente_id, monto, fecha } = req.body

    if (!cliente_id) {
      return res.status(400).json({ error: 'El cliente es requerido' })
    }

    if (!monto || monto <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0' })
    }

    const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(cliente_id)
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    const id = uuidv4()
    const fechaAbono = fecha || new Date().toISOString()
    const fechaCreacion = new Date().toISOString()

    db.prepare(`
      INSERT INTO abonos (id, cliente_id, monto, fecha, estado, fecha_creacion)
      VALUES (?, ?, ?, ?, 'Disponible', ?)
    `).run(id, cliente_id, monto, fechaAbono, fechaCreacion)

    const created = db.prepare(`
      SELECT a.*, c.nombre as cliente_nombre
      FROM abonos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?
    `).get(id)

    res.status(201).json({ data: created })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/:id/aplicar', (req, res) => {
  try {
    const { aplicaciones } = req.body

    const abono = db.prepare('SELECT * FROM abonos WHERE id = ?').get(req.params.id)
    if (!abono) {
      return res.status(404).json({ error: 'Abono no encontrado' })
    }

    const totalAplicado = db.prepare(`
      SELECT COALESCE(SUM(monto_aplicado), 0) as total
      FROM abono_entrega
      WHERE abono_id = ?
    `).get(req.params.id)

    let disponible = abono.monto - totalAplicado.total

    const insertAplicacion = db.prepare(`
      INSERT INTO abono_entrega (id, abono_id, entrega_id, monto_aplicado)
      VALUES (?, ?, ?, ?)
    `)

    for (const app of aplicaciones) {
      if (app.monto_aplicado <= 0) continue

      const entrega = db.prepare('SELECT * FROM entregas WHERE id = ? AND cliente_id = ?').get(app.entrega_id, abono.cliente_id)
      if (!entrega) continue

      const entregaAplicado = db.prepare(`
        SELECT COALESCE(SUM(monto_aplicado), 0) as total
        FROM abono_entrega
        WHERE entrega_id = ?
      `).get(app.entrega_id)

      const pendiente = entrega.total - entregaAplicado.total
      const aplicar = Math.min(app.monto_aplicado, pendiente, disponible)

      if (aplicar > 0) {
        insertAplicacion.run(uuidv4(), req.params.id, app.entrega_id, aplicar)
        disponible -= aplicar

        const nuevoAplicado = entregaAplicado.total + aplicar
        let nuevoEstado = 'Pendiente'
        if (nuevoAplicado >= entrega.total) nuevoEstado = 'Pagada'
        else if (nuevoAplicado > 0) nuevoEstado = 'ParcialmentePagada'

        db.prepare('UPDATE entregas SET estado = ? WHERE id = ?').run(nuevoEstado, app.entrega_id)
      }
    }

    const nuevoTotalAplicado = db.prepare(`
      SELECT COALESCE(SUM(monto_aplicado), 0) as total
      FROM abono_entrega
      WHERE abono_id = ?
    `).get(req.params.id)

    if (nuevoTotalAplicado.total >= abono.monto) {
      db.prepare('UPDATE abonos SET estado = ? WHERE id = ?').run('Aplicado', req.params.id)
    }

    const updated = db.prepare(`
      SELECT a.*, c.nombre as cliente_nombre
      FROM abonos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      WHERE a.id = ?
    `).get(req.params.id)

    res.json({ data: updated })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
