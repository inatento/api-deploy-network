// src/controllers/FileController.ts
import { Request, Response, NextFunction } from 'express'
import { CfgFileService } from '../services/CfgFileS'
import { Hosts } from '../types'

export class FileController {
  private readonly cfgFileService = new CfgFileService()

  public getCfgFileContent = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.cfgFileService
      .readFile()
      .then(content => {
        res.json({ content })
      })
      .catch(error => {
        if (error instanceof Error) {
          next(new Error(`Error al leer el archivo: ${error.message}`))
        } else {
          next(new Error('Un error desconocido ocurrió en la lectura del archivo'))
        }
      })
  }

  public pingHosts = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    this.cfgFileService
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

  public addHost = (req: Request, res: Response): void => {
    const { section, key, ansibleHost, ansibleUser } = req.body

    // Validate input
    if (
      typeof section !== 'string' ||
      typeof key !== 'string' ||
      typeof ansibleHost !== 'string' ||
      typeof ansibleUser !== 'string'
    ) {
      res.status(400).json({ error: 'Formato inválido' })
      return
    }
    // Llamar a la función addHost del servicio
    this.cfgFileService
      .addHost(section as keyof Hosts, key, ansibleHost, ansibleUser)
      .then(() => {
        res
          .status(200)
          .json({ message: `Host ${key} agregado en la sección ${section}.` })
      })
      .catch((error: Error) => {
        res.status(400).json({ error: error.message })
      })
  }

  public deleteHost = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { section, key } = req.body

    // Validate input
    if (typeof section !== 'string' || typeof key !== 'string') {
      res.status(400).json({ error: 'Formato inválido' })
      return
    }

    this.cfgFileService.deleteHost(section as keyof Hosts, key)
      .then(() => {
        res.status(200).json({ message: `Host ${key} eliminado de la sección ${section}.` })
      })
      .catch(error => {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message })
        } else {
          next(new Error('Un error desconocido ocurrió borrando el host'))
        }
      })
  }
}
