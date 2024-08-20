import exppress from 'express'
import { FileController } from '../controllers/FleCtrllr'
import { CfgFileService } from '../services/CfgFileS'
import { FileService } from '../services/FileS'

const router = exppress.Router()

const fileController = new FileController(new CfgFileService(new FileService()))

router.get('/cfg-file-content', fileController.getCfgFileContent)

router.get('/ping-hosts', fileController.pingHosts)

router.post('/add-host', fileController.addHost)

router.post('/delete-host', fileController.deleteHost)

export default router
