import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import trendsRouter from './routes/trends.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TubeInspire API funcionando' })
})

app.use('/api/trends', trendsRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default app