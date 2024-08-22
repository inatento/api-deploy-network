import fs from 'fs'

export class DockerComposeService {
  public generateDockerCompose (host: string, path: string): void {
    const composeTemplate = fs.readFileSync(
      './src/templates/docker-compose-ca-template.yml',
      'utf8'
    )
    const composeContent = composeTemplate.replace(/{{HOST_NAME}}/g, host)

    fs.writeFileSync(
      `${path}/${host}-docker-compose.yaml`,
      composeContent
    )
  }
}
