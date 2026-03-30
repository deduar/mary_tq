import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ProductoForm from '../components/ProductoForm.vue'
import api from '../services/api'

vi.mock('../services/api')

describe('ProductoForm', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/productos', name: 'Productos', component: { template: '<div>Productos</div>' } },
      { path: '/productos/new', name: 'NuevoProducto', component: ProductoForm }
    ]
  })

  it('should render form for new product', async () => {
    const wrapper = mount(ProductoForm, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h2').text()).toBe('Nuevo Producto')
    expect(wrapper.find('input#nombre').exists()).toBe(true)
    expect(wrapper.find('textarea#descripcion').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Guardar')
  })

  it('should show validation error when name is empty', async () => {
    api.createProducto.mockRejectedValue(new Error('El nombre es requerido'))
    
    const wrapper = mount(ProductoForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input#nombre').setValue('')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.vm.error).toBe('El nombre es requerido')
  })

  it('should call createProducto with form data', async () => {
    api.createProducto.mockResolvedValue({ data: { id: '1', nombre: 'Test', descripcion: 'Desc' } })
    
    const push = vi.fn()
    router.push = push
    
    const wrapper = mount(ProductoForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input#nombre').setValue('Nuevo Producto')
    await wrapper.find('textarea#descripcion').setValue('Descripción')
    await wrapper.find('form').trigger('submit')
    
    expect(api.createProducto).toHaveBeenCalledWith({ nombre: 'Nuevo Producto', descripcion: 'Descripción' })
  })

  it('should disable submit button while saving', async () => {
    let resolveCreate
    api.createProducto.mockImplementation(() => new Promise(resolve => {
      resolveCreate = resolve
    }))
    
    const wrapper = mount(ProductoForm, {
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
