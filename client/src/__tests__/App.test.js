import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

describe('App.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } },
      { path: '/clientes', name: 'Clientes', component: { template: '<div>Clientes</div>' } },
      { path: '/productos', name: 'Productos', component: { template: '<div>Productos</div>' } }
    ]
  })

  it('should render app with header', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('header h1').text()).toBe('Mary TQ - Control de Entregas')
  })

  it('should render navigation links', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    const navLinks = wrapper.findAll('nav a')
    expect(navLinks.length).toBe(5)
    expect(navLinks[0].text()).toBe('Dashboard')
    expect(navLinks[1].text()).toBe('Clientes')
    expect(navLinks[2].text()).toBe('Productos')
    expect(navLinks[3].text()).toBe('Entregas')
    expect(navLinks[4].text()).toBe('Abonos')
  })
})
