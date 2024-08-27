import exppress from 'express'
import { DeployCAsCtrllr } from '../controllers/DeployCAsCtrllr'
import { RevertDeployCAsCtrllr } from '../controllers/RevertDeployCAsCtrllr'

const router = exppress.Router()

const deployCAsCtrllr = new DeployCAsCtrllr()
const revertCAsCtrllr = new RevertDeployCAsCtrllr()

router.post('/cas', deployCAsCtrllr.deployCAs)

router.delete('/revert-cas', revertCAsCtrllr.revertDeployCAs)

export default router
