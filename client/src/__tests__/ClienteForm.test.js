import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ClienteForm from '../components/ClienteForm.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('ClienteForm', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/clientes', name: 'Clientes', component: { template: '<div>Clientes</div>' } },
      { path: '/clientes/new', name: 'NuevoCliente', component: ClienteForm }
    ]
  })

  it('should render form for new client', async () => {
    const wrapper = mount(ClienteForm, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h2').text()).toBe('Nuevo Cliente')
    expect(wrapper.find('input#nombre').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Guardar')
  })

  it('should show validation error when name is empty', async () => {
    api.createCliente.mockRejectedValue(new Error('El nombre es requerido'))
    
    const wrapper = mount(ClienteForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input#nombre').setValue('')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.vm.error).toBe('El nombre es requerido')
  })

  it('should call createCliente with form data', async () => {
    api.createCliente.mockResolvedValue({ data: { id: '1', nombre: 'Test' } })
    
    const push = vi.fn()
    router.push = push
    
    const wrapper = mount(ClienteForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input#nombre').setValue('Nuevo Cliente')
    await wrapper.find('form').trigger('submit')
    
    expect(api.createCliente).toHaveBeenCalledWith({ nombre: 'Nuevo Cliente' })
  })

  it('should disable submit button while saving', async () => {
    let resolveCreate
    api.createCliente.mockImplementation(() => new Promise(resolve => {
      resolveCreate = resolve
    }))
    
    const wrapper = mount(ClienteForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input#nombre').setValue('Test')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button[type="submit"]').text()).toBe('Guardando...')
  })
})
