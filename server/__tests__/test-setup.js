import express from 'express'
import cors from 'cors'
import clientesRouter from '../routes/clientes.js'
import productosRouter from '../routes/productos.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/clientes', clientesRouter)
app.use('/api/productos', productosRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

export { app }
