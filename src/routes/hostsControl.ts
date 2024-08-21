import exppress from 'express'
import { HostsControlCtrllr } from '../controllers/HostsControlCtrllr'
import { HostsControlService } from '../services/HostsControlS'

const router = exppress.Router()

const hostsCtrlCtrllr = new HostsControlCtrllr(new HostsControlService())

router.get('/ping-hosts', hostsCtrlCtrllr.pingHosts)

router.post('/install-docker', hostsCtrlCtrllr.installDocker)

router.post('/deploy-cas', hostsCtrlCtrllr.deployCA)

export default router
