<template>
  <div class="abono-form">
    <div class="header">
      <button @click="goBack" class="btn-back">← Volver</button>
      <h2>Nuevo Abono</h2>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="cliente">Cliente *</label>
        <select id="cliente" v-model="form.cliente_id" required @change="loadEntregasPendientes">
          <option value="">Seleccionar cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre }} - Saldo: {{ formatCurrency(cliente.saldo) }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="monto">Monto *</label>
        <input id="monto" v-model.number="form.monto" type="number" min="0.01" step="0.01" required placeholder="0.00" />
      </div>
      
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input id="fecha" v-model="form.fecha" type="date" />
      </div>
      
      <div v-if="form.cliente_id && entregasPendientes.length > 0" class="form-group">
        <label>Aplicar a entregas (opcional)</label>
        <div v-for="entrega in entregasPendientes" :key="entrega.id" class="entrega-row">
          <label class="checkbox-label">
            <input type="checkbox" v-model="entrega.selected" />
            <span>{{ formatDate(entrega.fecha) }} - {{ formatCurrency(entrega.total) }} - Pendiente: {{ formatCurrency(entrega.total - entrega.aplicado) }}</span>
          </label>
          <input v-if="entrega.selected" v-model.number="entrega.montoAplicar" type="number" min="0" :max="entrega.total - entrega.aplicado" step="0.01" placeholder="Monto a aplicar" />
        </div>
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="saving || !isValid">
          {{ saving ? 'Guardando...' : 'Guardar Abono' }}
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
  monto: '',
  fecha: new Date().toISOString().split('T')[0]
})

const clientes = ref([])
const entregasPendientes = ref([])
const saving = ref(false)
const error = ref(null)

const isValid = computed(() => {
  return form.value.cliente_id && form.value.monto > 0
})

const loadData = async () => {
  try {
    const response = await api.getClientes()
    clientes.value = response.data
  } catch (err) {
    error.value = err.message
  }
}

const loadEntregasPendientes = async () => {
  if (!form.value.cliente_id) {
    entregasPendientes.value = []
    return
  }
  
  try {
    const response = await api.getCliente(form.value.cliente_id)
    entregasPendientes.value = response.data.entregas
      .filter(e => e.estado !== 'Pagada')
      .map(e => ({
        ...e,
        selected: false,
        montoAplicar: Math.min(e.total - e.aplicado, form.value.monto || 0)
      }))
  } catch (err) {
    error.value = err.message
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0)
}

const handleSubmit = async () => {
  try {
    saving.value = true
    error.value = null
    
    const abono = await api.createAbono({
      cliente_id: form.value.cliente_id,
      monto: form.value.monto,
      fecha: form.value.fecha
    })
    
    const aplicaciones = entregasPendientes.value
      .filter(e => e.selected && e.montoAplicar > 0)
      .map(e => ({
        entrega_id: e.id,
        monto_aplicado: e.montoAplicar
      }))
    
    if (aplicaciones.length > 0) {
      await api.applyAbono(abono.data.id, aplicaciones)
    }
    
    router.push('/clientes')
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
}

.entrega-row {
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.checkbox-label input {
  width: auto;
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
