<template>
  <div class="cliente-form">
    <div class="header">
      <button @click="goBack" class="btn-back">← Volver</button>
      <h2>{{ isEdit ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre *</label>
        <input 
          id="nombre" 
          v-model="form.nombre" 
          type="text" 
          required
          placeholder="Nombre del cliente"
        />
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
  nombre: ''
})

const saving = ref(false)
const error = ref(null)

const loadCliente = async () => {
  if (!isEdit) return
  try {
    const response = await api.getCliente(id)
    form.value.nombre = response.data.nombre
  } catch (err) {
    error.value = err.message
  }
}

const handleSubmit = async () => {
  try {
    saving.value = true
    error.value = null
    
    if (isEdit) {
      await api.updateCliente(id, { nombre: form.value.nombre })
    } else {
      await api.createCliente({ nombre: form.value.nombre })
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

onMounted(loadCliente)
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

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
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
