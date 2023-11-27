import { fileHasValidExtension } from '../../extensions/has-valid-extension'
import { AutoExporterOptions } from '../../types/module-exporter.types'
import {
    logColoredMessage,
    logMessageForFunction
} from '../../utils/log-with-color'
import { collectPaths } from './collect-paths'

export async function collectRelevantPaths(
  rootDir: string,
  config: AutoExporterOptions
): Promise<string[]> {
  let pathsToReturn: string[] = []
  const path = require('path')
  pathsToReturn = await collectPaths(rootDir, config)
  if (config.debug) {
    logMessageForFunction('collectRelevantPaths', { pathsToReturn })
  }

  // Filter based on specificFiles if provided
  if (config.specificFiles && config.specificFiles.length) {
    pathsToReturn = pathsToReturn.filter((filePath) =>
      config.specificFiles!.includes(path.basename(filePath))
    )
  } else {
    const ignoredExtensions = config.ignoredExtensions || []
    if (ignoredExtensions.length) {
      pathsToReturn = pathsToReturn.filter((filePath) => {
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
  }

  // Filter based on valid extensions
  return pathsToReturn.filter((filePath) =>
    fileHasValidExtension(filePath, config)
  )
}
