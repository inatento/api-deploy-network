import path from 'path'
import { ExecTasks } from './ExecTasks'

export class HostsControlService {
  private readonly execTasks = new ExecTasks()

  private readonly setHostsPath: string = path.resolve(
    __dirname,
    '../ansible/playbooks/set_hosts.yml'
  )

  private readonly deployCAPath: string = path.resolve(
    __dirname,
    '../ansible/playbooks/deploy_ca.yaml'
  )

  public async pingHosts (): Promise<string> {
    return await this.execTasks.runAnsibleCommand('all -m ping')
  }

  public async installDocker (): Promise<string> {
    return await this.execTasks.runAnsibleCommand(this.setHostsPath, true)
  }

  public async deployCA (): Promise<string> {
    return await this.execTasks.runAnsibleCommand(this.deployCAPath, true)
  }
}
