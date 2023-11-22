import { collectPathsFromDirectories } from '../features/collect-paths/collect-paths-from-directories'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'
import { generateExportsFromPaths } from './generator-exports-from-paths'

export async function generateExportsFromDir(
  startPath: string,
  config: AutoExporterOptions
): Promise<string[]> {
  try {
    logColoredMessage(`Starting export generation from directory...`, 'green')

    const filteredPaths = await collectPathsFromDirectories(startPath, config)
    return generateExportsFromPaths(filteredPaths, config)
  } catch (error: any) {
    logColoredMessage(`Error generating exports from directory...`, 'red')
    logColoredMessage(error.toString(), 'red')
    return []
  }
}
