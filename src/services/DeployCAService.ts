import * as fs from 'fs'
import * as path from 'path'
import { HostsService } from '../services/HostsService'
import { CAConfigService } from '../services/CAConfigService'
import { DockerComposeService } from '../services/DockerComposeService'
import { AnsibleTaskService } from './TaskService'
import { ExecTasks } from './ExecTasks'

export class DeployCAService {
  private readonly hostsService = new HostsService()
  private readonly caConfigService = new CAConfigService()
  private readonly dockerComposeService = new DockerComposeService()
  private readonly ansibleTaskService = new AnsibleTaskService()
  private readonly execTasks = new ExecTasks()

  public async deployCAs (): Promise<void> {
    try {
      const caHosts = await this.hostsService.getCAHosts()

      for (const hostName of Object.keys(caHosts)) {
        const dirGenFilesPath = path.join('./src/generated_files/ca/', hostName)
        const dirPlaybookPath = path.join(
          process.cwd(),
          'src/ansible/playbooks/'
        )

        // Crear el directorio si no existe
        if (!fs.existsSync(dirGenFilesPath)) {
          fs.mkdirSync(dirGenFilesPath, { recursive: true })
        }
        console.log(dirGenFilesPath)
        const hostData = caHosts[hostName]
        this.caConfigService.generateCAConfig(
          hostName,
          hostData,
          dirGenFilesPath
        )
        this.dockerComposeService.generateDockerCompose(
          hostName,
          dirGenFilesPath
        )
        const taskPath = this.ansibleTaskService.generateAnsibleTask(hostName, dirPlaybookPath)

        // Ejecutar la tarea de Ansible para cada host
        await this.execTasks.runAnsibleCommand(taskPath, true)
      }

      // Luego puedes ejecutar las tareas de Ansible para desplegar
    } catch (error) {
      console.error('Error deploying CAs:', error)
      throw new Error('Failed to deploy CAs')
    }

    // Luego puedes ejecutar las tareas de Ansible para desplegar
  }
}
