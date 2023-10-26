import { ModuleExportOptions } from '../types/types'
import { collectPaths } from './collect-paths'
import { generateExportsFromPaths } from './generator-exports-from-paths'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export async function generateExportsFromDir(
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

  return generateExportsFromPaths(filteredPaths, config)
}
