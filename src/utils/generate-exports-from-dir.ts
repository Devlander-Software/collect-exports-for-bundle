import { ModuleExportOptions } from '../types/types'
import { collectRelevantPaths } from './collect-relavant-paths'
import { generateExportsFromPaths } from './generator-exports-from-paths'
import { logColoredMessage as colorLog } from './log-with-color'

export function generateExportsFromDir(
  rootDir: string,
  config: ModuleExportOptions
): string[] {
  colorLog('Starting export generation from directory...', 'green')
  const collectedPaths = collectRelevantPaths(rootDir, config)
  const distinctPaths = [...new Set(collectedPaths)]
  return generateExportsFromPaths(distinctPaths, config)
}
