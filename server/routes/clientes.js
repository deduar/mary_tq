import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../db/database.js'

const router = express.Router()

router.get('/', (req, res) => {
  try {
    const clientes = db.prepare(`
      SELECT c.id, c.nombre, c.fecha_creacion, c.activo,
        COALESCE((SELECT SUM(e.total) FROM entregas e WHERE e.cliente_id = c.id), 0) -
        COALESCE((SELECT SUM(ae.monto_aplicado) FROM abono_entrega ae 
          JOIN abonos a ON ae.abono_id = a.id WHERE a.cliente_id = c.id), 0) as saldo
      FROM clientes c
      WHERE c.activo = 1 
      ORDER BY c.nombre ASC
    `).all()
    res.json({ data: clientes })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const cliente = db.prepare(`
      SELECT id, nombre, fecha_creacion, activo 
      FROM clientes 
      WHERE id = ?
    `).get(req.params.id)

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    const entregas = db.prepare(`
      SELECT e.id, e.fecha, e.total, e.estado,
        COALESCE(SUM(ae.monto_aplicado), 0) as aplicado
      FROM entregas e
      LEFT JOIN abono_entrega ae ON e.id = ae.entrega_id
      WHERE e.cliente_id = ?
      GROUP BY e.id
      ORDER BY e.fecha DESC
    `).all(req.params.id)

    const abonos = db.prepare(`
      SELECT a.id, a.monto, a.fecha, a.estado,
        COALESCE(SUM(ae.monto_aplicado), 0) as aplicado
      FROM abonos a
      LEFT JOIN abono_entrega ae ON a.id = ae.abono_id
      WHERE a.cliente_id = ?
      GROUP BY a.id
      ORDER BY a.fecha DESC
    `).all(req.params.id)

    const totalEntregas = db.prepare(`
      SELECT COALESCE(SUM(total), 0) as total 
      FROM entregas 
      WHERE cliente_id = ?
    `).get(req.params.id)

    const appliedPayments = db.prepare(`
      SELECT COALESCE(SUM(ae.monto_aplicado), 0) as total
      FROM abono_entrega ae
      JOIN abonos a ON ae.abono_id = a.id
      WHERE a.cliente_id = ?
    `).get(req.params.id)

    const saldo = totalEntregas.total - appliedPayments.total

    res.json({ 
      data: { 
        ...cliente, 
        entregas, 
        abonos, 
        saldo 
      } 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', (req, res) => {
  try {
    const { nombre } = req.body

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }

    const id = uuidv4()
    const fecha_creacion = new Date().toISOString()

    db.prepare(`
      INSERT INTO clientes (id, nombre, fecha_creacion, activo)
      VALUES (?, ?, ?, 1)
    `).run(id, nombre.trim(), fecha_creacion)

    const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(id)
    res.status(201).json({ data: cliente })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', (req, res) => {
  try {
    const { nombre } = req.body

    const existing = db.prepare('SELECT * FROM clientes WHERE id = ?').get(req.params.id)
    if (!existing) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }

    db.prepare(`
      UPDATE clientes SET nombre = ? WHERE id = ?
    `).run(nombre.trim(), req.params.id)

    const cliente = db.prepare('SELECT * FROM clientes WHERE id = ?').get(req.params.id)
    res.json({ data: cliente })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
