const API_URL = `${window.location.protocol}//${window.location.hostname}:3000/api`

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'An error occurred')
  }
  
  return data
}

export const api = {
  // Client endpoints
  getClientes: () => fetchAPI('/clientes'),
  getCliente: (id) => fetchAPI(`/clientes/${id}`),
  createCliente: (data) => fetchAPI('/clientes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateCliente: (id, data) => fetchAPI(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Product endpoints
  getProductos: () => fetchAPI('/productos'),
  getProducto: (id) => fetchAPI(`/productos/${id}`),
  createProducto: (data) => fetchAPI('/productos', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateProducto: (id, data) => fetchAPI(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Entrega endpoints
  getEntregas: () => fetchAPI('/entregas'),
  getEntrega: (id) => fetchAPI(`/entregas/${id}`),
  createEntrega: (data) => fetchAPI('/entregas', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateEntrega: (id, data) => fetchAPI(`/entregas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getEntregaPagos: (id) => fetchAPI(`/entregas/${id}/pagos`),

  // Abono endpoints
  getAbonos: () => fetchAPI('/abonos'),
  getAbono: (id) => fetchAPI(`/abonos/${id}`),
  createAbono: (data) => fetchAPI('/abonos', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  applyAbono: (id, aplicaciones) => fetchAPI(`/abonos/${id}/aplicar`, {
    method: 'POST',
    body: JSON.stringify({ aplicaciones })
  }),

  // Dashboard endpoints
  getDashboardStats: () => fetchAPI('/dashboard/stats')
}

export default api
