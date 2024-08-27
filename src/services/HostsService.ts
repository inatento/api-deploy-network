import { HostsContent } from '../types' // Importa las interfaces desde types.ts
import { CfgFileService } from './CfgFileS'

export class HostsService {
  private readonly cfgFileService = new CfgFileService()
  private readonly hostsPath: string = './src/ansible/inventory/hosts.yaml'

  public async getCAHosts (): Promise<Record<string, HostsContent>> {
    const hosts = await this.cfgFileService.readFile()
    const casHosts = hosts?.cas?.hosts

    // Retorna los hosts de las CAs si existen
    return casHosts ?? {}
  }

  public getHostsFilePath (): string {
    return this.hostsPath
  }
}
