<template>
  <div class="cliente-detail">
    <div class="header">
      <button @click="goBack" class="btn-back">← Volver</button>
      <router-link :to="`/clientes/${id}/edit`" class="btn-edit">Editar</router-link>
    </div>
    
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="cliente" class="detail-content">
      <h2>{{ cliente.nombre }}</h2>
      
      <div class="saldo-card" :class="cliente.saldo > 0 ? 'pendiente' : 'al-día'">
        <h3>Saldo: {{ formatCurrency(cliente.saldo) }}</h3>
      </div>
      
      <div class="section">
        <h3>Entregas</h3>
        <div v-if="cliente.entregas.length === 0" class="empty">No hay entregas</div>
        <div v-else class="list">
          <div v-for="entrega in cliente.entregas" :key="entrega.id" class="item">
            <span>{{ formatDate(entrega.fecha) }}</span>
            <span>{{ formatCurrency(entrega.total) }}</span>
            <span :class="`estado ${entrega.estado.toLowerCase()}`">{{ entrega.estado }}</span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3>Abonos</h3>
        <div v-if="cliente.abonos.length === 0" class="empty">No hay abonos</div>
        <div v-else class="list">
          <div v-for="abono in cliente.abonos" :key="abono.id" class="item">
            <span>{{ formatDate(abono.fecha) }}</span>
            <span>{{ formatCurrency(abono.monto) }}</span>
            <span>{{ abono.estado }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const cliente = ref(null)
const loading = ref(true)
const error = ref(null)

const loadCliente = async () => {
  try {
    loading.value = true
    const response = await api.getCliente(id)
    cliente.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/clientes')
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)
}

onMounted(loadCliente)
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.btn-back, .btn-edit {
  background-color: #34495e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

.saldo-card {
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.saldo-card.pendiente {
  background-color: #fee;
  border: 2px solid #e74c3c;
}

.saldo-card.al-día {
  background-color: #efe;
  border: 2px solid #42b983;
}

.section {
  margin-top: 1.5rem;
}

.list {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
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

.loading, .error, .empty {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
