import { createComments } from '../comments/create-comments'
import { removeExtensionAndMakeRelative } from '../extensions/remove-extension-and-make-relative'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { getDuration } from '../utils/get-duration'
import { getFileContent } from '../utils/get-file-content'
import { getFilenameFromPath } from '../utils/get-file-name-from-path'
import {
  logColoredMessage,
  logFailedMessage,
  logMessageForFunction
} from '../utils/log-with-color'
import { buildExportsFromPaths } from './build-exports-from-paths'

export function generateExportsFromPaths(
  paths: string[],
  config: AutoExporterOptions
): string[] {
  try {
    if (config.debug) {
      const rootDir = config.rootDir
      logMessageForFunction(
        'generateExportsFromPaths',
        { paths, rootDir },
        'Inside of generateExportsFromPaths'
      )
    }
    console.log()
    if (!config.rootDir || config.rootDir === '') {
      throw new Error('rootDir is required')
    }

    const usedFunctionNames: Set<string> = new Set()
    const usedFunctionTypes: Set<string> = new Set()
    const results: string[] = []
    const defaultExportString: string[] = []

    if (config.debug) {
      logMessageForFunction('generateExportsFromPaths', { paths })
    }

    logColoredMessage(`Generating exports from provided paths...`, 'green')

    let index = 0
    while (index < paths.length) {
      const filepath = paths[index]
      const fileName = getFilenameFromPath(filepath)
      if (config.debug) {
        logMessageForFunction('generateExportsFromPaths', { fileName })
      }

      const fileContent = getFileContent(filepath)
      if (config.debug) {
        logMessageForFunction('generateExportsFromPaths', { fileContent })
      }

      const withoutExtension = removeExtensionAndMakeRelative(
        filepath,
        config.rootDir
      )
      if (config.debug) {
        logMessageForFunction('generateExportsFromPaths', { withoutExtension })
      }

      if (fileName && typeof fileName === 'string') {
        buildExportsFromPaths({
          fileName,
          fileContent,
          withoutExtension,
          filepath,
          usedFunctionNames,
          usedFunctionTypes,
          defaultExportString,
          results,
          config
        })
      } else {
        logColoredMessage(`Failed to get filename from path ${filepath}`, 'red')
      }
      index++
    }

    const endedAt = new Date().getTime()
    config.results.endTime = endedAt
    config.results.duration = getDuration(config.results.startTime, endedAt)

    const comments = createComments({
      includedExports: config.results.includedExports,
      excludedExports: config.results.excludedExports,
      includedFiles: config.results.includedFiles,
      excludedFiles: config.results.excludedFiles,
      includedFolders: config.results.includedFolders,
      excludedFolders: config.results.excludedFolders,
      startTime: config.results.startTime,
      endTime: config.results.endTime,
      allowedExtensions: config.allowedExtensions,
      ignoredExtensions: config.ignoredExtensions,
      title: config.title || '',
      description: config.description || ''
    })

    return [...results, ...defaultExportString, comments]
  } catch (error) {
    console.log(error)
    logFailedMessage('generateExportsFromPaths', error)
    return []
  }
}
