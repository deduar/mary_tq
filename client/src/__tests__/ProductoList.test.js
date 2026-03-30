import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ProductoList from '../views/ProductoList.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('ProductoList', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/productos', name: 'Productos', component: ProductoList }]
  })

  it('should render loading state', async () => {
    api.getProductos.mockImplementation(() => new Promise(() => {}))
    
    const wrapper = mount(ProductoList, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.text()).toContain('Cargando')
  })

  it('should render error state on API failure', async () => {
    api.getProductos.mockRejectedValue(new Error('Network error'))
    
    const wrapper = mount(ProductoList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Network error')
  })

  it('should render empty state when no products', async () => {
    api.getProductos.mockResolvedValue({ data: [] })
    
    const wrapper = mount(ProductoList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('No hay productos')
  })

  it('should render list of products', async () => {
    api.getProductos.mockResolvedValue({
      data: [
        { id: '1', nombre: 'Producto A', descripcion: 'Desc A', fecha_creacion: '2024-01-01' },
        { id: '2', nombre: 'Producto B', descripcion: 'Desc B', fecha_creacion: '2024-01-02' }
      ]
    })
    
    const wrapper = mount(ProductoList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Producto A')
    expect(wrapper.text()).toContain('Producto B')
  })

  it('should have new product button', async () => {
    api.getProductos.mockResolvedValue({ data: [] })
    
    const wrapper = mount(ProductoList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const button = wrapper.find('a.btn-primary')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Nuevo Producto')
  })
})
