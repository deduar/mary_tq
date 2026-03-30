<template>
  <div class="entrega-form">
    <div class="header">
      <button @click="goBack" class="btn-back">← Volver</button>
      <h2>Nueva Entrega</h2>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="cliente">Cliente *</label>
        <select id="cliente" v-model="form.cliente_id" required>
          <option value="">Seleccionar cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input id="fecha" v-model="form.fecha" type="date" />
      </div>
      
      <div class="form-group">
        <label>Productos</label>
        <div v-for="(item, index) in form.productos" :key="index" class="producto-row">
          <select v-model="item.producto_id" @change="updateProductoNombre(index)">
            <option value="">Seleccionar producto</option>
            <option v-for="p in productos" :key="p.id" :value="p.id">
              {{ p.nombre }}
            </option>
          </select>
          <input v-model.number="item.cantidad" type="number" min="1" placeholder="Cantidad" @input="calculateSubtotal(index)" />
          <input v-model.number="item.precio" type="number" min="0" step="0.01" placeholder="Precio" @input="calculateSubtotal(index)" />
          <span class="subtotal">{{ formatCurrency(item.subtotal) }}</span>
          <button type="button" @click="removeProducto(index)" class="btn-remove">×</button>
        </div>
        <button type="button" @click="addProducto" class="btn-add">+ Agregar Producto</button>
      </div>
      
      <div class="total-section">
        <span>Total:</span>
        <span class="total">{{ formatCurrency(total) }}</span>
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="saving || !isValid">
          {{ saving ? 'Guardando...' : 'Guardar Entrega' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const form = ref({
  cliente_id: '',
  fecha: new Date().toISOString().split('T')[0],
  productos: [{ producto_id: '', cantidad: 1, precio: 0, subtotal: 0 }]
})

const clientes = ref([])
const productos = ref([])
const saving = ref(false)
const error = ref(null)

const total = computed(() => {
  return form.value.productos.reduce((sum, p) => sum + (p.subtotal || 0), 0)
})

const isValid = computed(() => {
  return form.value.cliente_id && form.value.productos.length > 0 && 
    form.value.productos.some(p => p.producto_id && p.cantidad > 0)
})

const loadData = async () => {
  try {
    const [clientesRes, productosRes] = await Promise.all([
      api.getClientes(),
      api.getProductos()
    ])
    clientes.value = clientesRes.data
    productos.value = productosRes.data
  } catch (err) {
    error.value = err.message
  }
}

const addProducto = () => {
  form.value.productos.push({ producto_id: '', cantidad: 1, precio: 0, subtotal: 0 })
}

const removeProducto = (index) => {
  form.value.productos.splice(index, 1)
}

const updateProductoNombre = (index) => {
  calculateSubtotal(index)
}

const calculateSubtotal = (index) => {
  const p = form.value.productos[index]
  p.subtotal = (p.cantidad || 0) * (p.precio || 0)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0)
}

const handleSubmit = async () => {
  try {
    saving.value = true
    error.value = null
    
    const productosValidos = form.value.productos.filter(p => p.producto_id && p.cantidad > 0)
    
    await api.createEntrega({
      cliente_id: form.value.cliente_id,
      fecha: form.value.fecha,
      productos: productosValidos
    })
    
    router.push('/entregas')
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(loadData)
</script>

<style scoped>
.header {
  margin-bottom: 1rem;
}

.btn-back {
  background: none;
  border: none;
  color: #34495e;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select, input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.producto-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.subtotal {
  font-weight: bold;
  text-align: right;
}

.btn-add, .btn-remove {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add {
  background-color: #34495e;
  color: white;
  width: 100%;
}

.btn-remove {
  background-color: #e74c3c;
  color: white;
  font-size: 1.2rem;
}

.total-section {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 1rem 0;
}

.total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.form-actions {
  margin-top: 1.5rem;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.btn-primary:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
}
</style>
