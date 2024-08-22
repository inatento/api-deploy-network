import fs from 'fs'
import { HostsContent } from '../types'

export class CAConfigService {
  public generateCAConfig (
    hostName: string,
    hostData: HostsContent,
    path: string
  ): void {
    const configTemplate = fs.readFileSync(
      './src/templates/fabric-ca-server-config.yaml',
      'utf8'
    )

    const configContent = configTemplate
      .replace(/{{HOST_NAME_CAP}}/g, this.capitalizeFirstLetter(hostName))
      .replace(/{{HOST_NAME}}/g, hostName)
      .replace(/{{HOST}}/g, hostData.ansible_host)

    fs.writeFileSync(
      `${path}/${hostName}-fabric-ca-server-config.yaml`,
      configContent
    )
  }

  public capitalizeFirstLetter (text: string): string {
    if (text.length === 0) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
