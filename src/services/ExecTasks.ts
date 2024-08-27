import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export class ExecTasks {
  private readonly ansibleConfigPath: string = path.resolve(
    __dirname,
    '../ansible/ansible.cfg'
  )

  private readonly hostsCfgPath: string = path.resolve(
    __dirname,
    '../ansible/inventory/hosts.yaml'
  )

  private async executeCommand (command: string): Promise<string> {
    return await this.executeAnsibleCommand(command)
  }

  private assembleCommandArgs (
    moduleOrPlaybook: string,
    isPlaybook = false
  ): string {
    return isPlaybook
      ? `ansible-playbook -i ${this.hostsCfgPath} ${moduleOrPlaybook}`
      : `ansible -i ${this.hostsCfgPath} ${moduleOrPlaybook}`
  }

  public async runAnsibleCommand (
    moduleOrPlaybook: string,
    isPlaybook = false
  ): Promise<string> {
    const command = this.assembleCommandArgs(moduleOrPlaybook, isPlaybook)
    return await this.executeCommand(command)
  }

  private async executeAnsibleCommand (command: string): Promise<string> {
    try {
      console.log(`Comando Ansible: ${command}`)
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
        throw new Error(`Error al comunicarse con los hosts: ${error.message}`)
      } else {
        throw new Error(
          'Ocurrió un error desconocido al comunicarse con los hosts'
        )
      }
    }
  }
}
