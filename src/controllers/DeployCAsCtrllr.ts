// src/controllers/FileController.ts
import { Request, Response, NextFunction } from 'express'
import { DeployCAService } from '../services/DeployCAService'

export class DeployCAsCtrllr {
  private readonly deployCAService = new DeployCAService()

  public deployCAs = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.deployCAService
      .deployCAs()
      .then(output => {
        res.json({ message: 'CAs desplegadas con éxito', output })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al desplegar CAs: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió al desplegar CAs'))
        }
      })
  }
}
