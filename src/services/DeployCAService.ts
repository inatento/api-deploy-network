import * as fs from 'fs'
import * as path from 'path'
import { HostsService } from '../services/HostsService'
import { FillTemplateService } from './FillTemplateService'
import { ExecTasks } from './ExecTasks'

export class DeployCAService {
  private readonly hostsService = new HostsService()
  private readonly fillTemplateService = new FillTemplateService()
  private readonly execTasks = new ExecTasks()

  public async deployCAs (): Promise<string> {
    try {
      const caHosts = await this.hostsService.getCAHosts()
      // Crear una lista de promesas para almacenar los resultados
      const taskResults = await Promise.all(
        Object.keys(caHosts).map(async hostName => {
          const dirGenFilesPath = path.join(
            './src/generated_files/ca/',
            hostName
          )
          const dirPlaybookPath = path.join(__dirname, '../ansible/playbooks')

          // Crear el directorio si no existe
          if (!fs.existsSync(dirGenFilesPath)) {
            fs.mkdirSync(dirGenFilesPath, { recursive: true })
          }
          const taskPath = await this.fillTemplateService.generateYML(
            // await this.fillTemplateService.generateYML(
            hostName,
            dirPlaybookPath,
            'deploy_ca_task.yaml',
            '_deploy_ca'
          )

          await this.fillTemplateService.generateYML(
            hostName,
            dirPlaybookPath,
            'deploy_ca_task_rollback.yaml',
            '_deploy_ca_rollback'
          )

          await this.fillTemplateService.generateYML(
            hostName,
            dirGenFilesPath,
            'docker-compose-ca.yaml',
            '-docker-compose'
          )

          await this.fillTemplateService.generateYML(
            hostName,
            dirGenFilesPath,
            'fabric-ca-server-config.yaml',
            '-fabric-ca-server-config',
            caHosts[hostName].ansible_host
          )

          // Ejecutar la tarea de Ansible para cada host y devolver la promesa
          return await this.execTasks.runAnsibleCommand(taskPath, true)
        })
      )

      // Unir los resultados en un solo string
      const combinedResults = taskResults.join('\n')

      console.log('Todas las tareas de Ansible se completaron exitosamente')
      return combinedResults // Retornar los resultados combinados
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Se generó un error desplegando las CAs: ${error.message}`
        )
      } else {
        throw new Error('Ocurrió un error desconocido al desplegar las CAs')
      }
    }
  }
}
