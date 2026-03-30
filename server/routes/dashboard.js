import express from 'express'
import db from '../db/database.js'

const router = express.Router()

router.get('/stats', (req, res) => {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const dateStr = thirtyDaysAgo.toISOString().split('T')[0]

    const entregas = db.prepare(`
      SELECT DATE(fecha) as fecha, COUNT(*) as count, SUM(total) as total
      FROM entregas
      WHERE DATE(fecha) >= ?
      GROUP BY DATE(fecha)
      ORDER BY fecha
    `).all(dateStr)

    const abonos = db.prepare(`
      SELECT DATE(fecha) as fecha, COUNT(*) as count, SUM(monto) as total
      FROM abonos
      WHERE DATE(fecha) >= ?
      GROUP BY DATE(fecha)
      ORDER BY fecha
    `).all(dateStr)

    res.json({
      entregas,
      abonos
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
