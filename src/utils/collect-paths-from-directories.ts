import * as fs from 'fs'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { collectPaths } from './collect-paths'
import { hasDefaultExport, hasNamedExports } from './export-patterns'
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
      // check to see if the file has either a default export or named exports
      // if it doesn't, it's not a valid file
      const fileOutput = fs.readFileSync(path, 'utf8').toString()
      const hasExports =
        hasDefaultExport(fileOutput) || hasNamedExports(fileOutput)
      if (hasExports) {
        return path
      }
    }
  })

  return filteredPaths
}
