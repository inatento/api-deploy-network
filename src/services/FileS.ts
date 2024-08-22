import fs from 'fs'
import yaml from 'js-yaml'
import { Hosts } from '../types'

export class FileService {
  public async readFileYAML (path: string): Promise<Hosts> {
    try {
      const fileContent = fs.readFileSync(path, 'utf8')
      const data = yaml.load(fileContent) as Hosts
      return data
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(`Error al leer el archivo: ${error.message}`)
      } else {
        throw new Error('Unknown error occurred while reading the file')
      }
    }
  }

  public writeYAMLFile (path: string, data: Record<string, any>): void {
    try {
      fs.writeFileSync(path, yaml.dump(data))
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error al escribir el archivo: ${e.message}`)
      } else {
        throw new Error('Unknown error occurred while reading the file')
      }
    }
  }
}
