import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('Dashboard', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', name: 'Dashboard', component: Dashboard }]
  })

  it('should render dashboard with stats', async () => {
    api.getClientes.mockResolvedValue({ data: [{ id: '1', nombre: 'Cliente A' }] })
    api.getProductos.mockResolvedValue({ data: [{ id: '1', nombre: 'Producto A' }] })
    
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Clientes')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('Productos')
  })

  it('should handle API errors gracefully', async () => {
    api.getClientes.mockRejectedValue(new Error('Error'))
    api.getProductos.mockResolvedValue({ data: [] })
    
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Clientes')
    expect(wrapper.text()).toContain('0')
  })
})
