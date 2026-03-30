import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../db/database.js'

const router = express.Router()

router.get('/', (req, res) => {
  try {
    const productos = db.prepare(`
      SELECT id, nombre, descripcion, fecha_creacion, activo 
      FROM productos 
      WHERE activo = 1 
      ORDER BY nombre ASC
    `).all()
    res.json({ data: productos })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', (req, res) => {
  try {
    const producto = db.prepare(`
      SELECT id, nombre, descripcion, fecha_creacion, activo 
      FROM productos 
      WHERE id = ?
    `).get(req.params.id)

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json({ data: producto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }

    const id = uuidv4()
    const fecha_creacion = new Date().toISOString()

    db.prepare(`
      INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo)
      VALUES (?, ?, ?, ?, 1)
    `).run(id, nombre.trim(), descripcion?.trim() || null, fecha_creacion)

    const producto = db.prepare('SELECT * FROM productos WHERE id = ?').get(id)
    res.status(201).json({ data: producto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    const existing = db.prepare('SELECT * FROM productos WHERE id = ?').get(req.params.id)
    if (!existing) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }

    db.prepare(`
      UPDATE productos SET nombre = ?, descripcion = ? WHERE id = ?
    `).run(nombre.trim(), descripcion?.trim() || null, req.params.id)

    const producto = db.prepare('SELECT * FROM productos WHERE id = ?').get(req.params.id)
    res.json({ data: producto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
