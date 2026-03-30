import { describe, it, expect } from 'vitest'
import router from '../router/index.js'

describe('Router', () => {
  it('should have routes defined', () => {
    const routes = router.getRoutes()
    expect(routes.length).toBeGreaterThan(0)
  })

  it('should have dashboard route', () => {
    const routes = router.getRoutes()
    const dashboardRoute = routes.find(r => r.path === '/')
    expect(dashboardRoute).toBeDefined()
    expect(dashboardRoute.name).toBe('Dashboard')
  })

  it('should have clientes routes', () => {
    const routes = router.getRoutes()
    const clientesRoute = routes.find(r => r.path === '/clientes')
    expect(clientesRoute).toBeDefined()
  })

  it('should have productos routes', () => {
    const routes = router.getRoutes()
    const productosRoute = routes.find(r => r.path === '/productos')
    expect(productosRoute).toBeDefined()
  })

  it('should use history mode', () => {
    expect(router.options.history).toBeDefined()
  })
})
