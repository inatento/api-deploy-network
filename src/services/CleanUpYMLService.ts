import fs from 'fs'
import path from 'path'

export class CleanUpYMLService {
  private readonly baseDir: string

  constructor (baseDir: string) {
    this.baseDir = baseDir
  }

  public removeFiles (orgName: string): void {
    const filesToRemove = [
      `../generated_files/ca/${orgName}/${orgName}-docker-compose.yaml`,
      `../generated_files/ca/${orgName}/${orgName}-fabric-ca-server-config.yaml`,
      `../ansible/playbooks/${orgName}_deploy_ca.yaml`,
      `../ansible/playbooks/${orgName}_deploy_ca_rollback.yaml`
      // Agrega más archivos si es necesario
    ]

    filesToRemove.forEach(file => {
      const filePath = path.join(this.baseDir, file)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log(`Borrado: ${filePath}`)
      } else {
        console.log(`Archivo no encontrado: ${filePath}`)
      }
    })

    // Opcionalmente, elimina directorios vacíos
    const directoriesToRemove = [`../generated_files/ca/${orgName}`]

    directoriesToRemove.forEach(dir => {
      const dirPath = path.join(this.baseDir, dir)
      if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath, { recursive: true })
        console.log(`Directorio borrado: ${dirPath}`)
      } else {
        console.log(`Directorio no encontrado: ${dirPath}`)
      }
    })
  }
}
