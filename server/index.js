import express from 'express'
import cors from 'cors'
import clientesRouter from './routes/clientes.js'
import productosRouter from './routes/productos.js'
import entregasRouter from './routes/entregas.js'
import abonosRouter from './routes/abonos.js'
import dashboardRouter from './routes/dashboard.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/clientes', clientesRouter)
app.use('/api/productos', productosRouter)
app.use('/api/entregas', entregasRouter)
app.use('/api/abonos', abonosRouter)
app.use('/api/dashboard', dashboardRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
