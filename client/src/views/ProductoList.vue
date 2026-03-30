<template>
  <div class="producto-list">
    <div class="header">
      <h2>Productos</h2>
      <router-link to="/productos/new" class="btn-primary">Nuevo Producto</router-link>
    </div>
    
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="producto-grid">
      <div v-for="producto in productos" :key="producto.id" class="producto-card">
        <h3>{{ producto.nombre }}</h3>
        <p v-if="producto.descripcion" class="descripcion">{{ producto.descripcion }}</p>
        <p class="fecha">Creado: {{ formatDate(producto.fecha_creacion) }}</p>
        <div class="actions">
          <router-link :to="`/productos/${producto.id}/edit`" class="btn-edit">Editar</router-link>
        </div>
      </div>
      
      <div v-if="productos.length === 0" class="empty">
        No hay productos registrados
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const productos = ref([])
const loading = ref(true)
const error = ref(null)

const loadProductos = async () => {
  try {
    loading.value = true
    const response = await api.getProductos()
    productos.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES')
}

onMounted(loadProductos)
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

.producto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.producto-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.producto-card h3 {
  margin-bottom: 0.5rem;
}

.descripcion {
  color: #666;
  margin-bottom: 0.5rem;
}

.fecha {
  color: #999;
  font-size: 0.8rem;
}

.actions {
  margin-top: 1rem;
}

.btn-edit {
  color: #42b983;
  text-decoration: none;
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
