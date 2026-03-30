<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="chart-container">
      <Line :data="chartConfig" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import api from '../services/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartData = ref({
  fechas: [],
  entregas: [],
  abonos: [],
  entregasAcumulado: []
})

const chartConfig = computed(() => ({
  labels: chartData.value.fechas,
  datasets: [
    {
      label: 'Entregas',
      backgroundColor: '#42b983',
      borderColor: '#42b983',
      data: chartData.value.entregas,
      tension: 0.3
    },
    {
      label: 'Abonos',
      backgroundColor: '#7c3aed',
      borderColor: '#7c3aed',
      data: chartData.value.abonos,
      tension: 0.3
    },
    {
      label: 'Entregas Acumulado',
      backgroundColor: '#e74c3c',
      borderColor: '#e74c3c',
      data: chartData.value.entregasAcumulado,
      tension: 0.3,
      borderDash: [5, 5]
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

onMounted(async () => {
  try {
    const dashboardRes = await api.getDashboardStats()

    const entMap = {}
    dashboardRes.entregas.forEach(e => { entMap[e.fecha] = e.total || 0 })
    const aboMap = {}
    dashboardRes.abonos.forEach(a => { aboMap[a.fecha] = a.total || 0 })

    const fechasConDatos = new Set()
    dashboardRes.entregas.forEach(e => fechasConDatos.add(e.fecha))
    dashboardRes.abonos.forEach(a => fechasConDatos.add(a.fecha))
    const sortedFechas = Array.from(fechasConDatos).sort()

    let lastEntregaValue = 0
    chartData.value.entregas = sortedFechas.map(f => {
      if (entMap[f]) {
        lastEntregaValue = entMap[f]
        return entMap[f]
      }
      return lastEntregaValue
    })
    
    chartData.value.abonos = sortedFechas.map(f => aboMap[f] || 0)
    
    chartData.value.fechas = sortedFechas.map(f => {
      const d = new Date(f)
      return `${d.getDate()}/${d.getMonth() + 1}`
    })
    
    let acumulado = 0
    chartData.value.entregasAcumulado = sortedFechas.map(f => {
      if (entMap[f]) {
        acumulado += entMap[f]
      }
      return acumulado
    })
  } catch (error) {
    console.error('Error loading stats:', error)
  }
})
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}

.chart-container {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  height: 400px;
}
</style>
