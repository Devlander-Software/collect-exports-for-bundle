import { getPathsWithExports } from '../../export-related/get-paths-with-exports'
import { AutoExporterOptions, Results } from '../../types/module-exporter.types'
import { logColoredMessage, logFailedMessage } from '../../utils/log-with-color'
import { BundleExportAsFunctionParams } from '../bundle-export-as-function'
import { collectPaths } from './collect-paths'

export type CollectPathsFromDirectoriesParams = {
  (startPath: string, config: AutoExporterOptions): Promise<string[]>
}

export interface ConfigForCollectPathsFromDirectories
  extends Partial<AutoExporterOptions>,
    Partial<BundleExportAsFunctionParams> {
  debug?: boolean
  specificFiles?: string[]
  ignoredExtensions?: string[]
  results?: Results
  excludedFolders?: string[]
  bundleAsObjectForDefaultExport?: string
  outputFileName?: string
  rootDir?: string
}

export async function collectPathsFromDirectories(
  startPath: string,
  config: ConfigForCollectPathsFromDirectories,
  message?: string
): Promise<string[]> {
  try {
    const directoriesChecked: string[] = []
    if (!config.rootDir) {
      config.rootDir = startPath
    }
    if (message) {
      logColoredMessage(message, 'blue')
    }
    logColoredMessage(
      `Collecting paths from directory... ${startPath}  
    `,
      'green'
    )
    if (message && config.debug) {
      logColoredMessage(message, 'blue')
    }
    const collectedPaths: string[] = await collectPaths(startPath, config)

    const distinctPaths = [...new Set(collectedPaths)] // Remove duplicates using Set
    if (config.debug) {
      logColoredMessage(`Distinct paths: ${distinctPaths} \n`, 'blue')
    }

    const filteredPaths = await getPathsWithExports(distinctPaths, config)

    if (config.debug) {
      logColoredMessage(`Collected paths: ${collectedPaths} \n`, 'magenta')
      logColoredMessage(`Filtered paths: ${filteredPaths} \n`, 'yellow')
      logColoredMessage(`Directories checked: ${directoriesChecked} \n`, 'blue')
    }

    return filteredPaths
  } catch (err: any) {
    logFailedMessage('collectPathsFromDirectories', err)

    return []
  }
}
