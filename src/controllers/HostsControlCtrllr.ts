// src/controllers/FileController.ts
import { Request, Response, NextFunction } from 'express'
import { HostsControlService } from '../services/HostsControlS'

export class HostsControlCtrllr {
  constructor (private readonly hostCtrlS: HostsControlService) {}

  public pingHosts = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.hostCtrlS
      .pingHosts()
      .then(output => {
        res.json({ message: 'Ping exitoso', output })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al hacer ping: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió en el ping'))
        }
      })
  }

  public installDocker = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.hostCtrlS
      .installDocker()
      .then(output => {
        res.json({ message: 'Docker instalado en los hosts', output })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al instalar Docker: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió al instalar Docker'))
        }
      })
  }

  public deployCA = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.hostCtrlS
      .deployCA()
      .then(output => {
        res.json({ message: 'CAs instaladas en los hosts', output })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al desplegar las CAs: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió al desplegar las CAs'))
        }
      })
  }
}
