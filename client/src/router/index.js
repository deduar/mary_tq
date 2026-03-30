import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ClienteList from '../views/ClienteList.vue'
import ClienteDetail from '../views/ClienteDetail.vue'
import ClienteForm from '../components/ClienteForm.vue'
import ProductoList from '../views/ProductoList.vue'
import ProductoForm from '../components/ProductoForm.vue'
import EntregaList from '../views/EntregaList.vue'
import EntregaForm from '../views/EntregaForm.vue'
import AbonoForm from '../views/AbonoForm.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: ClienteList
  },
  {
    path: '/clientes/new',
    name: 'NuevoCliente',
    component: ClienteForm
  },
  {
    path: '/clientes/:id',
    name: 'ClienteDetail',
    component: ClienteDetail
  },
  {
    path: '/clientes/:id/edit',
    name: 'EditarCliente',
    component: ClienteForm
  },
  {
    path: '/productos',
    name: 'Productos',
    component: ProductoList
  },
  {
    path: '/productos/new',
    name: 'NuevoProducto',
    component: ProductoForm
  },
  {
    path: '/productos/:id/edit',
    name: 'EditarProducto',
    component: ProductoForm
  },
  {
    path: '/entregas',
    name: 'Entregas',
    component: EntregaList
  },
  {
    path: '/entregas/new',
    name: 'NuevaEntrega',
    component: EntregaForm
  },
  {
    path: '/abonos/new',
    name: 'NuevoAbono',
    component: AbonoForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
