import { ModuleExportOptions } from '../types/module-exporter.types'
import { collectPaths } from './collect-paths'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export async function collectRelevantPaths(
  rootDir: string,
  config: ModuleExportOptions
): Promise<string[]> {
  const path = require('path')
  let allPaths = await collectPaths(rootDir, config)

  // Filter based on specificFiles if provided
  if (config.specificFiles && config.specificFiles.length) {
    return allPaths.filter((filePath) =>
      config.specificFiles!.includes(path.basename(filePath))
    )
  }

  const ignoredExtensions = config.ignoredExtensions || []
  if (ignoredExtensions.length) {
    allPaths = allPaths.filter((filePath) => {
      logColoredMessage(
        `Checking filepath inside of collect relavant paths ${filePath}`,
        'yellow'
      )
      const fileName = path.basename(filePath)
      const fileExtension = path.extname(fileName)
      logColoredMessage(
        `Checking file extension inside of collect relavant paths ${fileExtension}`,
        'yellow'
      )
      return !ignoredExtensions.includes(fileExtension)
    })
  }

  // Filter based on valid extensions
  return allPaths.filter((filePath) => fileHasValidExtension(filePath, config))
}
