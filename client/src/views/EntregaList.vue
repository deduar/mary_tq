<template>
  <div class="entrega-list">
    <div class="header">
      <h2>Entregas</h2>
      <router-link to="/entregas/new" class="btn-primary">Nueva Entrega</router-link>
    </div>
    
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="entrega-grid">
      <div v-for="entrega in entregas" :key="entrega.id" class="entrega-card">
        <div class="entrega-header">
          <h3>{{ entrega.cliente_nombre }}</h3>
          <span :class="`estado ${entrega.estado.toLowerCase()}`">{{ entrega.estado }}</span>
        </div>
        <p class="fecha">Fecha: {{ formatDate(entrega.fecha) }}</p>
        <p class="total">{{ formatCurrency(entrega.total) }}</p>
      </div>
      
      <div v-if="entregas.length === 0" class="empty">
        No hay entregas registradas
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const entregas = ref([])
const loading = ref(true)
const error = ref(null)

const loadEntregas = async () => {
  try {
    loading.value = true
    const response = await api.getEntregas()
    entregas.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)
}

onMounted(loadEntregas)
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

.entrega-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.entrega-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.entrega-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.estado {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.estado.pendiente {
  background-color: #fee;
  color: #e74c3c;
}

.estado.parcialmentepagada {
  background-color: #ffc;
  color: #f39c12;
}

.estado.pagada {
  background-color: #efe;
  color: #42b983;
}

.fecha {
  color: #666;
  font-size: 0.9rem;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.loading, .error, .empty {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}
</style>
