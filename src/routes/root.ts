import exppress from 'express'
import { FileController } from '../controllers/FleController'
import { CfgFileService } from '../services/CfgFileService'
import { FileService } from '../services/FileService'

const router = exppress.Router()

const fileController = new FileController(new CfgFileService(new FileService()))

router.get('/file-content', fileController.getFileContent)

router.get('/ping-hosts', fileController.pingHosts)

router.post('/add-host', fileController.addHost)

router.post('/delete-host', fileController.deleteHost)

export default router
