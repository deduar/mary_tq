import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { app } from './test-setup.js'
import db from '../db/database.js'

describe('API Clientes', () => {
  const testIds = {
    c1: uuidv4(),
    c2: uuidv4(),
    c3: uuidv4(),
    c4: uuidv4(),
    c5: uuidv4()
  }
  
  beforeEach(() => {
    db.prepare('DELETE FROM abono_entrega').run()
    db.prepare('DELETE FROM abonos').run()
    db.prepare('DELETE FROM entrega_producto').run()
    db.prepare('DELETE FROM entregas').run()
    db.prepare('DELETE FROM clientes').run()
  })

  describe('GET /api/clientes', () => {
    it('should return clients sorted by name', async () => {
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c1, 'Zebra', new Date().toISOString()
      )
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c2, 'Alpha', new Date().toISOString()
      )
      
      const response = await request(app).get('/api/clientes')
      expect(response.body.data[0].nombre).toBe('Alpha')
      expect(response.body.data[1].nombre).toBe('Zebra')
    })

    it('should only return active clients', async () => {
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c1, 'Active Client', new Date().toISOString()
      )
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 0)').run(
        testIds.c2, 'Inactive Client', new Date().toISOString()
      )
      
      const response = await request(app).get('/api/clientes')
      const nombres = response.body.data.map(c => c.nombre)
      expect(nombres).toContain('Active Client')
      expect(nombres).not.toContain('Inactive Client')
    })
  })

  describe('POST /api/clientes', () => {
    it('should create a client with valid name', async () => {
      const response = await request(app)
        .post('/api/clientes')
        .send({ nombre: 'Nuevo Cliente' })
      
      expect(response.status).toBe(201)
      expect(response.body.data.nombre).toBe('Nuevo Cliente')
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.activo).toBe(1)
    })

    it('should return 400 when name is empty', async () => {
      const response = await request(app)
        .post('/api/clientes')
        .send({ nombre: '' })
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('El nombre es requerido')
    })

    it('should return 400 when name is missing', async () => {
      const response = await request(app)
        .post('/api/clientes')
        .send({})
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('El nombre es requerido')
    })
  })

  describe('GET /api/clientes/:id', () => {
    it('should return client details with saldo', async () => {
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c1, 'Detail Client', new Date().toISOString()
      )
      const entregaId = uuidv4()
      db.prepare('INSERT INTO entregas (id, cliente_id, fecha, total, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)').run(
        entregaId, testIds.c1, new Date().toISOString(), 100, 'Pendiente', new Date().toISOString()
      )
      const abonoId = uuidv4()
      db.prepare('INSERT INTO abonos (id, cliente_id, monto, fecha, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)').run(
        abonoId, testIds.c1, 50, new Date().toISOString(), 'Aplicado', new Date().toISOString()
      )
      db.prepare('INSERT INTO abono_entrega (id, abono_id, entrega_id, monto_aplicado) VALUES (?, ?, ?, ?)').run(
        uuidv4(), abonoId, entregaId, 50
      )
      
      const response = await request(app).get(`/api/clientes/${testIds.c1}`)
      expect(response.status).toBe(200)
      expect(response.body.data.nombre).toBe('Detail Client')
      expect(response.body.data.saldo).toBe(50)
      expect(response.body.data.entregas.length).toBe(1)
      expect(response.body.data.abonos.length).toBe(1)
    })

    it('should return 404 for non-existent client', async () => {
      const response = await request(app).get('/api/clientes/non-existent')
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Cliente no encontrado')
    })
  })

  describe('PUT /api/clientes/:id', () => {
    it('should update client name', async () => {
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c1, 'Old Name', new Date().toISOString()
      )
      
      const response = await request(app)
        .put(`/api/clientes/${testIds.c1}`)
        .send({ nombre: 'New Name' })
      
      expect(response.status).toBe(200)
      expect(response.body.data.nombre).toBe('New Name')
    })

    it('should return 404 for non-existent client', async () => {
      const response = await request(app)
        .put('/api/clientes/non-existent')
        .send({ nombre: 'New Name' })
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('Cliente no encontrado')
    })

    it('should return 400 when name is empty', async () => {
      db.prepare('INSERT INTO clientes (id, nombre, fecha_creacion, activo) VALUES (?, ?, ?, 1)').run(
        testIds.c1, 'Test', new Date().toISOString()
      )
      
      const response = await request(app)
        .put(`/api/clientes/${testIds.c1}`)
        .send({ nombre: '' })
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('El nombre es requerido')
    })
  })
})
