import { ModuleExportOptions } from '../types/types'
import { collectPathsFromDirectories } from './collect-paths-from-directories'
import { generateExportsFromPaths } from './generator-exports-from-paths'
import { logColoredMessage } from './log-with-color'

export async function generateExportsFromDir(
  startPath: string,
  config: ModuleExportOptions
): Promise<string[]> {
  logColoredMessage(`Starting export generation from directory...`, 'green')
  const filteredPaths = await collectPathsFromDirectories(startPath, config)

  return generateExportsFromPaths(filteredPaths, config)
}
