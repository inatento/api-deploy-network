import fs from 'fs'

export class FillTemplateService {
  public generateYML (
    hostName: string,
    path: string,
    templateFileName: string,
    fileSuffix: string,
    ip?: string
  ): string {
    const taskTemplate = fs.readFileSync(
      `./src/templates/${templateFileName}`,
      'utf8'
    )
    let taskContent = taskTemplate
      .replace(/{{HOST_NAME_CAP}}/g, this.capitalizeFirstLetter(hostName))
      .replace(/{{HOST_NAME}}/g, hostName)
    // Si se proporciona el puerto, reemplazar en el template
    if (ip != null) {
      console.log('IP %s', ip)
      taskContent = taskContent.replace(/{{IP}}/g, ip)
    }
    const filePath = `${path}/${hostName}${fileSuffix}.yaml`
    fs.writeFileSync(filePath, taskContent)

    return filePath
  }

  public capitalizeFirstLetter (text: string): string {
    if (text.length === 0) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
