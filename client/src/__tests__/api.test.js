import { describe, it, expect, vi, beforeEach } from 'vitest'
import api from '../services/api'

global.fetch = vi.fn()

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getClientes', () => {
    it('should return data on successful response', async () => {
      const mockData = [{ id: '1', nombre: 'Cliente A' }]
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockData })
      })

      const result = await api.getClientes()
      expect(result.data).toEqual(mockData)
    })

    it('should throw error on failed response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Error message' })
      })

      await expect(api.getClientes()).rejects.toThrow('Error message')
    })
  })

  describe('getCliente', () => {
    it('should return single client', async () => {
      const mockClient = { id: '1', nombre: 'Cliente A' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockClient })
      })

      const result = await api.getCliente('1')
      expect(result.data).toEqual(mockClient)
    })
  })

  describe('createCliente', () => {
    it('should create client with correct payload', async () => {
      const newClient = { nombre: 'Nuevo Cliente' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: '1', ...newClient } })
      })

      await api.createCliente(newClient)
      
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/clientes',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newClient)
        })
      )
    })
  })

  describe('getProductos', () => {
    it('should return productos', async () => {
      const mockProductos = [{ id: '1', nombre: 'Producto A' }]
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockProductos })
      })

      const result = await api.getProductos()
      expect(result.data).toEqual(mockProductos)
    })
  })

  describe('createProducto', () => {
    it('should create producto', async () => {
      const newProducto = { nombre: 'Nuevo Producto', descripcion: 'Desc' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: '1', ...newProducto } })
      })

      await api.createProducto(newProducto)
      
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/productos',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newProducto)
        })
      )
    })
  })

  describe('updateCliente', () => {
    it('should update cliente', async () => {
      const updatedData = { nombre: 'Updated' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: '1', ...updatedData } })
      })

      await api.updateCliente('1', updatedData)
      
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/clientes/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updatedData)
        })
      )
    })
  })

  describe('updateProducto', () => {
    it('should update producto', async () => {
      const updatedData = { nombre: 'Updated', descripcion: 'Desc' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: '1', ...updatedData } })
      })

      await api.updateProducto('1', updatedData)
      
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/productos/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updatedData)
        })
      )
    })
  })
})
