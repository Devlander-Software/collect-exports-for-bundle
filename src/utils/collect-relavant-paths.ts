import { ModuleExportOptions } from '../types/types'
import { collectPaths } from './collect-paths'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export function collectRelevantPaths(
  rootDir: string,
  config: ModuleExportOptions
): string[] {
  const path = require('path')
  let allPaths = collectPaths(rootDir, config)

  // Filter based on specificFiles if provided
  if (config.specificFiles && config.specificFiles.length) {
    return allPaths.filter((filePath) =>
      config.specificFiles!.includes(path.basename(filePath))
    )
  }

  const ignoredExtensions = config.ignoredExtensions || []
  console.log(`Ignored extensions: ${ignoredExtensions}`)
  if (ignoredExtensions.length) {
    allPaths = allPaths.filter((filePath) => {
      logColoredMessage(
        `Checking filepath inside of collect relavant paths ${filePath}`,
        'red'
      )
      const fileName = path.basename(filePath)
      const fileExtension = path.extname(fileName)
      return !ignoredExtensions.includes(fileExtension)
    })
  }

  // Filter based on valid extensions
  return allPaths.filter((filePath) => fileHasValidExtension(filePath, config))
}
