import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ClienteList from '../views/ClienteList.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('ClienteList', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/clientes', name: 'Clientes', component: ClienteList }]
  })

  it('should render loading state', async () => {
    api.getClientes.mockImplementation(() => new Promise(() => {}))
    
    const wrapper = mount(ClienteList, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.text()).toContain('Cargando')
  })

  it('should render error state on API failure', async () => {
    api.getClientes.mockRejectedValue(new Error('Network error'))
    
    const wrapper = mount(ClienteList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Network error')
  })

  it('should render empty state when no clients', async () => {
    api.getClientes.mockResolvedValue({ data: [] })
    
    const wrapper = mount(ClienteList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('No hay clientes')
  })

  it('should render list of clients', async () => {
    api.getClientes.mockResolvedValue({
      data: [
        { id: '1', nombre: 'Cliente A', fecha_creacion: '2024-01-01' },
        { id: '2', nombre: 'Cliente B', fecha_creacion: '2024-01-02' }
      ]
    })
    
    const wrapper = mount(ClienteList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Cliente A')
    expect(wrapper.text()).toContain('Cliente B')
  })

  it('should have new client button', async () => {
    api.getClientes.mockResolvedValue({ data: [] })
    
    const wrapper = mount(ClienteList, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const button = wrapper.find('a.btn-primary')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Nuevo Cliente')
  })
})
