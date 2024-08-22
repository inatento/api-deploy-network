import exppress from 'express'
import { HostsControlCtrllr } from '../controllers/HostsControlCtrllr'

const router = exppress.Router()

const hostsCtrlCtrllr = new HostsControlCtrllr()

router.get('/ping-hosts', hostsCtrlCtrllr.pingHosts)

router.post('/install-docker', hostsCtrlCtrllr.installDocker)

router.post('/deploy-cas', hostsCtrlCtrllr.deployCA)

export default router
