import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { Hosts } from '../types'
import { FileService } from './FileS'

const execPromise = promisify(exec)

export class CfgFileService {
  private readonly fileService = new FileService()

  private readonly cfgFilePath: string = path.resolve(
    __dirname,
    '../ansible/inventory/hosts.yml'
  )

  public async readFile (): Promise<Hosts> {
    const data = await this.fileService.readFileYAML(this.cfgFilePath)
    return data
  }

  // Agregar un nuevo host
  public async addHost (
    section: keyof Hosts,
    key: string,
    ansibleHost: string,
    ansibleUser: string
  ): Promise<void> {
    const data = await this.fileService.readFileYAML(this.cfgFilePath)

    const sectionHosts = data?.[section]?.hosts

    if (typeof section !== 'string' || !this.isValidSection(section)) {
      throw new Error('Invalid section value')
    }

    // Validar input
    if (
      typeof key !== 'string' ||
      typeof ansibleHost !== 'string' ||
      typeof ansibleUser !== 'string'
    ) {
      throw new Error('Invalid input format')
    }

    if (sectionHosts !== null && sectionHosts !== undefined) {
      // Verificar si el host ya existe en la sección
      if (key in sectionHosts) {
        throw new Error(`El host ${key} ya existe en la sección ${section}.`)
      }
      // Agregar el nuevo host
      sectionHosts[key] = {
        ansible_host: ansibleHost,
        ansible_user: ansibleUser
      }
      // Guardar los cambios en el archivo YAML
      this.fileService.writeYAMLFile(this.cfgFilePath, data)
      console.log(`Host ${key} agregado en la sección ${section}.`)
    } else {
      throw new Error(`Sección ${section} no encontrada o no contiene hosts.`)
    }
  }

  // Eliminar un host existente
  public async deleteHost (section: keyof Hosts, key: string): Promise<void> {
    const data = await this.fileService.readFileYAML(this.cfgFilePath)

    const sectionData = data[section]
    const sectionHosts = sectionData?.hosts

    if (sectionData == null || sectionHosts == null) {
      throw new Error(`Sección ${section} no encontrada o no contiene hosts.`)
    }

    if (typeof section !== 'string' || !this.isValidSection(section)) {
      throw new Error('Invalid section value')
    }

    if (sectionHosts !== null && sectionHosts !== undefined) {
      // Verificar si el host existe en la sección
      if (!(key in sectionHosts)) {
        throw new Error(`El host ${key} no existe en la sección ${section}.`)
      }

      // Eliminar el host de manera segura utilizando desestructuración
      const { [key]: _, ...remainingHosts } = sectionHosts

      // Asignar los hosts restantes de nuevo a la sección
      data[section] = {
        ...data[section],
        hosts: remainingHosts
      }
      // Guardar los cambios en el archivo YAML
      this.fileService.writeYAMLFile(this.cfgFilePath, data)
      console.log(`Host ${key} eliminado de la sección ${section}.`)
    } else {
      throw new Error(`Sección ${section} no encontrada o no contiene hosts.`)
    }
  }

  public async pingHosts (): Promise<string> {
    try {
      const { stdout, stderr } = await execPromise(
        `ansible -i ${this.cfgFilePath} all -m ping`
      )
      // Validar stderr explícitamente
      if (stderr != null && stderr.trim().length > 0) {
        throw new Error(stderr)
      }
      return stdout
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error reading file: ${error.message}`)
      } else {
        throw new Error('Unknown error occurred while reading the file')
      }
    }
  }

  private isValidSection (section: string): section is keyof Hosts {
    return ['orgs', 'cas'].includes(section)
  }
}
