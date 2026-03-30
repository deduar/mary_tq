<template>
  <div class="producto-form">
    <div class="header">
      <button @click="goBack" class="btn-back">← Volver</button>
      <h2>{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre *</label>
        <input 
          id="nombre" 
          v-model="form.nombre" 
          type="text" 
          required
          placeholder="Nombre del producto"
        />
      </div>
      
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea 
          id="descripcion" 
          v-model="form.descripcion" 
          placeholder="Descripción opcional del producto"
          rows="3"
        ></textarea>
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="saving">
          {{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const isEdit = !!id

const form = ref({
  nombre: '',
  descripcion: ''
})

const saving = ref(false)
const error = ref(null)

const loadProducto = async () => {
  if (!isEdit) return
  try {
    const response = await api.getProducto(id)
    form.value.nombre = response.data.nombre
    form.value.descripcion = response.data.descripcion || ''
  } catch (err) {
    error.value = err.message
  }
}

const handleSubmit = async () => {
  try {
    saving.value = true
    error.value = null
    
    const data = {
      nombre: form.value.nombre,
      descripcion: form.value.descripcion || null
    }
    
    if (isEdit) {
      await api.updateProducto(id, data)
    } else {
      await api.createProducto(data)
    }
    
    router.push('/productos')
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(loadProducto)
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

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #42b983;
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
