import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { app } from './test-setup.js'
import db from '../db/database.js'

describe('API Productos', () => {
  const testIds = {
    p1: uuidv4(),
    p2: uuidv4(),
    p3: uuidv4()
  }

  beforeEach(() => {
    db.prepare('DELETE FROM entrega_producto').run()
    db.prepare('DELETE FROM productos').run()
  })

  describe('GET /api/productos', () => {
    it('should return products sorted by name', async () => {
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p1, 'Zebra', 'desc', new Date().toISOString()
      )
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p2, 'Alpha', 'desc', new Date().toISOString()
      )
      
      const response = await request(app).get('/api/productos')
      expect(response.body.data[0].nombre).toBe('Alpha')
      expect(response.body.data[1].nombre).toBe('Zebra')
    })

    it('should only return active products', async () => {
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p1, 'Active Product', 'desc', new Date().toISOString()
      )
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 0)').run(
        testIds.p2, 'Inactive Product', 'desc', new Date().toISOString()
      )
      
      const response = await request(app).get('/api/productos')
      const nombres = response.body.data.map(p => p.nombre)
      expect(nombres).toContain('Active Product')
      expect(nombres).not.toContain('Inactive Product')
    })
  })

  describe('POST /api/productos', () => {
    it('should create a product with valid name', async () => {
      const response = await request(app)
        .post('/api/productos')
        .send({ nombre: 'Nuevo Producto', descripcion: 'Descripción' })
      
      expect(response.status).toBe(201)
      expect(response.body.data.nombre).toBe('Nuevo Producto')
      expect(response.body.data.descripcion).toBe('Descripción')
    })

    it('should return 400 when name is empty', async () => {
      const response = await request(app)
        .post('/api/productos')
        .send({ nombre: '' })
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('El nombre es requerido')
    })
  })

  describe('GET /api/productos/:id', () => {
    it('should return product details', async () => {
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p1, 'Detail Product', 'Test description', new Date().toISOString()
      )
      
      const response = await request(app).get(`/api/productos/${testIds.p1}`)
      expect(response.status).toBe(200)
      expect(response.body.data.nombre).toBe('Detail Product')
    })

    it('should return 404 for non-existent product', async () => {
      const response = await request(app).get('/api/productos/non-existent')
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Producto no encontrado')
    })
  })

  describe('PUT /api/productos/:id', () => {
    it('should update product name and description', async () => {
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p1, 'Old Name', 'Old Desc', new Date().toISOString()
      )
      
      const response = await request(app)
        .put(`/api/productos/${testIds.p1}`)
        .send({ nombre: 'New Name', descripcion: 'New Desc' })
      
      expect(response.status).toBe(200)
      expect(response.body.data.nombre).toBe('New Name')
      expect(response.body.data.descripcion).toBe('New Desc')
    })

    it('should return 400 when name is empty', async () => {
      db.prepare('INSERT INTO productos (id, nombre, descripcion, fecha_creacion, activo) VALUES (?, ?, ?, ?, 1)').run(
        testIds.p1, 'Test', 'desc', new Date().toISOString()
      )
      
      const response = await request(app)
        .put(`/api/productos/${testIds.p1}`)
        .send({ nombre: '' })
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('El nombre es requerido')
    })
  })
})
