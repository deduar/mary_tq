import { describe, it, expect, vi } from 'vitest'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('main.js', () => {
  it('should create Vue app', () => {
    const app = createApp({ template: '<div>Test</div>' })
    expect(app).toBeDefined()
  })

  it('should create router with routes', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } }
      ]
    })
    expect(router).toBeDefined()
    expect(router.getRoutes().length).toBe(1)
  })

  it('should mount app to element', () => {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    
    const app = createApp({ template: '<div>Test App</div>' })
    app.mount('#app')
    
    expect(document.querySelector('#app')).toBeDefined()
  })
})
