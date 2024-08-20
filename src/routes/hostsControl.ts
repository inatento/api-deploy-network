import exppress from 'express'
import { HostsControlCtrllr } from '../controllers/HostsControlCtrllr'
import { HostsControlService } from '../services/HostsControlS'

const router = exppress.Router()

const hostsCtrlCtrllr = new HostsControlCtrllr(new HostsControlService())

router.get('/ping-hosts', hostsCtrlCtrllr.pingHosts)

router.get('/install-docker', hostsCtrlCtrllr.installDocker)

export default router
