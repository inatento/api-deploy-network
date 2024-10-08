import express from 'express'
import hostsSetup from './routes/hostsSetup'
import hostsControl from './routes/hostsControl'
import deployCA from './routes/deployCA'

const app = express()

app.use(express.json()) // middleware que transforma la req.body a json

const PORT = 3000

app.use('/hosts/setup', hostsSetup)
app.use('/hosts/control', hostsControl)
app.use('/deploy', deployCA)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
