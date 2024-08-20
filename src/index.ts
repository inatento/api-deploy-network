import express from 'express'
import diaryRoutes from './routes/root'

const app = express()

app.use(express.json()) // middleware que transforma la req.body a json

const PORT = 3000

app.use('/api/hosts', diaryRoutes)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
