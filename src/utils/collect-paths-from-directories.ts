import { AutoExporterOptions } from '../types/module-exporter.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { collectPaths } from './collect-paths'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export async function collectPathsFromDirectories(
  startPath: string,
  config: AutoExporterOptions | BundleExportAsFunctionParams,
  message?: string
): Promise<string[]> {
  if (message) {
    logColoredMessage(message, 'blue')
  }
  logColoredMessage(
    `Starting export generation from directory... ${startPath}  
    `,
    'green'
  )
  if (message && config.debug) {
    logColoredMessage(message, 'blue')
  }
  const collectedPaths: string[] = await collectPaths(startPath, config)

  const distinctPaths = [...new Set(collectedPaths)] // Remove duplicates using Set

  const filteredPaths = distinctPaths.filter((path) => {
    if (fileHasValidExtension(path, config)) {
      return path
    }
  })

  return filteredPaths
}
