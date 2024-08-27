import exppress from 'express'
import { FileController } from '../controllers/FleCtrllr'

const router = exppress.Router()

const fileController = new FileController()

router.get('/cfg-file-content', fileController.getCfgFileContent)

router.get('/ping-hosts', fileController.pingHosts)

router.post('/add-host', fileController.addHost)

router.delete('/delete-host', fileController.deleteHost)

export default router
