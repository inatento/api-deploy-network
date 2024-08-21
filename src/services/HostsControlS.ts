import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export class HostsControlService {
  private readonly ansibleConfigPath: string = path.resolve(
    __dirname,
    '../ansible/ansible.cfg'
  )

  private readonly hostsCfgPath: string = path.resolve(
    __dirname,
    '../ansible/inventory/hosts.yml'
  )

  private readonly setHostsPath: string = path.resolve(
    __dirname,
    '../ansible/playbooks/set_hosts.yml'
  )

  private readonly deployCAPath: string = path.resolve(
    __dirname,
    '../ansible/playbooks/deploy_ca.yaml'
  )

  private async executeAnsibleCommand (command: string): Promise<string> {
    try {
      const { stdout, stderr } = await execPromise(command, {
        env: {
          ...process.env,
          ANSIBLE_CONFIG: this.ansibleConfigPath
        }
      })

      if (stderr != null && stderr.trim().length > 0) {
        throw new Error(stderr)
      }
      return stdout
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al comunicarse son los hosts: ${error.message}`)
      } else {
        throw new Error(
          'Ocurrió un error desconocido al comunicarse con los hosts'
        )
      }
    }
  }

  public async pingHosts (): Promise<string> {
    const command = `ansible -i ${this.hostsCfgPath} all -m ping`
    return await this.executeAnsibleCommand(command)
  }

  public async installDocker (): Promise<string> {
    const command = `ansible-playbook -i ${this.hostsCfgPath} ${this.setHostsPath}`
    return await this.executeAnsibleCommand(command)
  }

  public async deployCA (): Promise<string> {
    const command = `ansible-playbook -i ${this.hostsCfgPath} ${this.deployCAPath}`
    return await this.executeAnsibleCommand(command)
  }
}
