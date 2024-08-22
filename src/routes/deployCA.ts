import exppress from 'express'
import { DeployCAsCtrllr } from '../controllers/DeployCAsCtrllr'

const router = exppress.Router()

const deployCAsCtrllr = new DeployCAsCtrllr()

router.post('/cas', deployCAsCtrllr.deployCAs)

export default router
