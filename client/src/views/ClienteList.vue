<template>
  <div class="cliente-list">
    <div class="header">
      <h2>Clientes</h2>
      <router-link to="/clientes/new" class="btn-primary">Nuevo Cliente</router-link>
    </div>
    
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="cliente-grid">
      <div 
        v-for="cliente in clientes" 
        :key="cliente.id" 
        class="cliente-card"
        @click="verDetalle(cliente.id)"
      >
        <h3>{{ cliente.nombre }}</h3>
        <p class="saldo" :class="{ 'saldo-negativo': cliente.saldo > 0 }">
          Deuda: ${{ cliente.saldo || 0 }}
        </p>
        <p class="fecha">Creado: {{ formatDate(cliente.fecha_creacion) }}</p>
      </div>
      
      <div v-if="clientes.length === 0" class="empty">
        No hay clientes registrados
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const clientes = ref([])
const loading = ref(true)
const error = ref(null)

const loadClientes = async () => {
  try {
    loading.value = true
    const response = await api.getClientes()
    clientes.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const verDetalle = (id) => {
  router.push(`/clientes/${id}`)
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES')
}

onMounted(loadClientes)
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

.cliente-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.cliente-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.cliente-card:hover {
  transform: translateY(-2px);
}

.cliente-card h3 {
  margin-bottom: 0.5rem;
}

.saldo {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.saldo-negativo {
  color: #e74c3c;
}

.fecha {
  color: #666;
  font-size: 0.8rem;
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
