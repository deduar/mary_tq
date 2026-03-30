import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ClienteDetail from '../views/ClienteDetail.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('ClienteDetail', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/clientes/:id', name: 'ClienteDetail', component: ClienteDetail }]
  })

  it('should render loading state', async () => {
    api.getCliente.mockImplementation(() => new Promise(() => {}))
    
    const wrapper = mount(ClienteDetail, {
      global: {
        plugins: [router]
      },
      props: {
        id: 'test-id'
      }
    })
    
    expect(wrapper.text()).toContain('Cargando')
  })

  it('should render error state on API failure', async () => {
    api.getCliente.mockRejectedValue(new Error('Network error'))
    
    const wrapper = mount(ClienteDetail, {
      global: {
        plugins: [router]
      },
      props: {
        id: 'test-id'
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Network error')
  })

  it('should render client details with saldo', async () => {
    api.getCliente.mockResolvedValue({
      data: {
        id: '1',
        nombre: 'Test Client',
        saldo: 50,
        entregas: [{ id: 'e1', fecha: '2024-01-01', total: 100, estado: 'Pendiente' }],
        abonos: [{ id: 'a1', fecha: '2024-01-02', monto: 50, estado: 'Aplicado' }]
      }
    })
    
    const wrapper = mount(ClienteDetail, {
      global: {
        plugins: [router]
      },
      props: {
        id: '1'
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Test Client')
    expect(wrapper.text()).toContain('50')
  })

  it('should have back button', async () => {
    api.getCliente.mockResolvedValue({
      data: { id: '1', nombre: 'Test', saldo: 0, entregas: [], abonos: [] }
    })
    
    const push = vi.fn()
    router.push = push
    
    const wrapper = mount(ClienteDetail, {
      global: {
        plugins: [router]
      },
      props: {
        id: '1'
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const backBtn = wrapper.find('button.btn-back')
    expect(backBtn.exists()).toBe(true)
  })

  it('should have edit button', async () => {
    api.getCliente.mockResolvedValue({
      data: { id: '1', nombre: 'Test', saldo: 0, entregas: [], abonos: [] }
    })
    
    const wrapper = mount(ClienteDetail, {
      global: {
        plugins: [router]
      },
      props: {
        id: '1'
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const editBtn = wrapper.find('a.btn-edit')
    expect(editBtn.exists()).toBe(true)
  })
})
