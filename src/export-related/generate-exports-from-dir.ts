import * as path from 'path'
import { collectPathsFromDirectories } from '../features/collect-paths/collect-paths-from-directories'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'
import { generateExportsFromPaths } from './generator-exports-from-paths'

export type BarrelResult = { outputPath: string; content: string[] }

export async function generateExportsFromDir(
  startPath: string,
  config: AutoExporterOptions
): Promise<BarrelResult[]> {
  try {
    if (config.debug) {
      logColoredMessage(`Starting export generation from directory...`, 'green')
    }

    const filteredPaths = await collectPathsFromDirectories(startPath, config)
    if (config.debug) {
      logColoredMessage(`Filtered paths: ${filteredPaths}`, 'magenta')
    }

    if (config.barrelMode === 'perDirectory') {
      const byDir = groupPathsByDirectory(filteredPaths)
      const results: BarrelResult[] = []
      for (const [dir, paths] of byDir) {
        const dirConfig = { ...config, rootDir: dir }
        const lines = generateExportsFromPaths(paths, dirConfig)
        results.push({
          outputPath: path.join(dir, config.outputFileName + config.outputFilenameExtension),
          content: lines
        })
      }
      return results
    }

    const lines = generateExportsFromPaths(filteredPaths, config)
    const outputPath = path.join(config.rootDir, config.outputFileName + config.outputFilenameExtension)
    return [{ outputPath, content: lines }]
  } catch (error: unknown) {
    logColoredMessage(`Error generating exports from directory...`, 'red')
    logColoredMessage(String(error), 'red')
    return []
  }
}

function groupPathsByDirectory(paths: string[]): Map<string, string[]> {
  const byDir = new Map<string, string[]>()
  for (const p of paths) {
    const dir = path.dirname(p)
    const list = byDir.get(dir) ?? []
    list.push(p)
    byDir.set(dir, list)
  }
  return byDir
}
