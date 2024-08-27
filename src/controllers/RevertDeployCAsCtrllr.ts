// src/controllers/FileController.ts
import { Request, Response, NextFunction } from 'express'
import { RevertDeployCAService } from '../services/RevertDeployCAService'

export class RevertDeployCAsCtrllr {
  private readonly revertDeployCAServ = new RevertDeployCAService()

  public revertDeployCAs = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.revertDeployCAServ
      .revertDeployCAs()
      .then(output => {
        res.json({ message: 'CAs revertidas con éxito', output })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al revertir CAs: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió al revertir CAs'))
        }
      })
  }
}
