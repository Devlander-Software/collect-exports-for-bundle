import { ModuleExportOptions } from '../types/module-exporter.types'
import { collectPaths } from './collect-paths'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export async function collectPathsFromDirectories(
  startPath: string,
  config: ModuleExportOptions
): Promise<string[]> {
  logColoredMessage(`Starting export generation from directory...`, 'green')
  const collectedPaths: string[] = await collectPaths(startPath, config)

  const distinctPaths = [...new Set(collectedPaths)] // Remove duplicates using Set

  const filteredPaths = distinctPaths.filter((path) => {
    if (fileHasValidExtension(path, config)) {
      return path
    }
  })

  return filteredPaths
}
