import fs from 'fs'

export class AnsibleTaskService {
  public generateAnsibleTask (hostName: string, path: string): string {
    const taskTemplate = fs.readFileSync(
      './src/templates/deploy_ca_task.yaml',
      'utf8'
    )
    const taskContent = taskTemplate
      .replace(/{{HOST_NAME_CAP}}/g, this.capitalizeFirstLetter(hostName))
      .replace(/{{HOST_NAME}}/g, hostName)
    const filePath = `${path}/${hostName}_deploy_ca.yml`
    fs.writeFileSync(filePath, taskContent)

    return filePath
  }

  public capitalizeFirstLetter (text: string): string {
    if (text.length === 0) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
