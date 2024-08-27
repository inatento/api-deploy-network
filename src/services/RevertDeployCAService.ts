import * as path from 'path'
import { CleanUpYMLService } from './CleanUpYMLService'
import { HostsService } from '../services/HostsService'
import { ExecTasks } from './ExecTasks'

export class RevertDeployCAService {
  private readonly hostsService = new HostsService()
  private readonly execTasks = new ExecTasks()

  public async revertDeployCAs (): Promise<String> {
    const cleanUpService = new CleanUpYMLService(__dirname)
    const caHosts = await this.hostsService.getCAHosts()
    const dirPlaybookPath = path.join(__dirname, '../ansible/playbooks')
    // Crear una lista de promesas para almacenar los resultados
    const taskResults = await Promise.all(
      Object.keys(caHosts).map(async hostName => {
        const taskPath = `${dirPlaybookPath}/${hostName}_deploy_ca_rollback.yaml`
        const result = await this.execTasks.runAnsibleCommand(taskPath, true)

        await cleanUpService.removeFiles(hostName) // Elimina los archivos relacionados con la CA
        return result
      })
    )

    // Unir los resultados en un solo string
    const combinedResults = taskResults.join('\n')

    console.log('Todas las tareas de Ansible se completaron exitosamente')
    return combinedResults // Retornar los resultados combinados
  }
}
