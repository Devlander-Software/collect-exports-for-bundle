import path from 'path'
import { createDurationComment } from '../comments/create-duration-comment'
import { createTitleComment } from '../comments/create-title-comment'
import { fileHasValidExtension } from '../extensions/has-valid-extension'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { getDuration } from '../utils/get-duration'
import { getFileContent } from '../utils/get-file-content'
import { getFilenameFromPath } from '../utils/get-file-name-from-path'
import {
  logColoredMessage,
  logMessageForFunction
} from '../utils/log-with-color'
import { createExportMatches } from './create-export-matches'
import { extractDefaultExportVariable } from './extract-default-export'
import { hasDefaultExport } from './has-default-export'

export interface BuildExportsFromPathParams {
  isPrimaryExportFile: boolean
  fileName: string
  fileContent: string
  results: string[]
  usedFunctionTypes: Set<string>
  withoutExtension: string
  filepath: string
  componentName: string
  usedFunctionNames: Set<string>
  defaultExportString: string[]
  config: AutoExporterOptions
}

const buildExportsFromPaths = (
  params: BuildExportsFromPathParams
): string[] => {
  const {
    isPrimaryExportFile,
    fileName,
    fileContent,
    withoutExtension,
    usedFunctionTypes,
    filepath,
    defaultExportString,
    componentName,
    results,
    usedFunctionNames,
    config
  } = params
  if (config.debug) {
    logColoredMessage(`Processing included file: ${filepath}...`, 'yellow')
  }

  const exportsFromFile = createExportMatches(
    [filepath],
    usedFunctionNames,
    usedFunctionTypes
  )
  if (isPrimaryExportFile && hasDefaultExport(fileContent)) {
    const defaultVariable = extractDefaultExportVariable(filepath)
    if (defaultVariable) {
      if (
        !defaultExportString.includes(
          `import ${defaultVariable} from "${withoutExtension}";`
        )
      ) {
        defaultExportString.push(
          `import ${defaultVariable} from "${withoutExtension}";`
        )
        defaultExportString.push(`export default ${defaultVariable};`)
      }
    } else {
      logColoredMessage(
        `Failed to extract default export from ${fileName}.`,
        'red'
      )
    }
  } else if (
    fileHasValidExtension(filepath, config) &&
    exportsFromFile.length > 0
  ) {
    const matchItem = exportsFromFile[0]
    if (
      matchItem &&
      matchItem.functionNames &&
      matchItem.functionNames.length > 0
    ) {
      const exportedFunctions =
        matchItem.functionNames.length > 0
          ? `{${matchItem.functionNames.join(', ')}}`
          : ''

      results.push(`export ${exportedFunctions} from '${withoutExtension}'`)
    }
    if (
      matchItem &&
      matchItem.functionTypes &&
      matchItem.functionTypes.length > 0
    ) {
      const exportedFunctions =
        matchItem.functionTypes.length > 0
          ? `{${matchItem.functionTypes.join(', ')}}`
          : ''

      results.push(
        `export type ${exportedFunctions} from '${withoutExtension}'`
      )
    }
  }

  return results
}

export function generateExportsFromPaths(
  paths: string[],
  config: AutoExporterOptions
): string[] {
  const usedFunctionNames: Set<string> = new Set()
  const usedFunctionTypes: Set<string> = new Set()

  if (config.debug) {
    logMessageForFunction('generateExportsFromPaths', { paths })
  }
  logColoredMessage(`Generating exports from provided paths...`, 'green')
  const results: string[] = []
  const defaultExportString: string[] = []
  if (!config.rootDir || config.rootDir === '') {
    throw new Error('rootDir is required')
  }

  let index = 0 // Index to track the current path
  while (index < paths.length) {
    // While loop to go through all paths
    const filepath = paths[index]
    const fileName = getFilenameFromPath(filepath)
    logMessageForFunction('generateExportsFromPaths', { fileName })
    const fileContent = getFileContent(filepath)
    logMessageForFunction('generateExportsFromPaths', { fileContent })
    const relativePath = `./${path
      .relative(config.rootDir, filepath)
      .replace(/\\/g, '/')}`
    logMessageForFunction('generateExportsFromPaths', { relativePath })
    const withoutExtension = relativePath.substring(
      0,
      relativePath.lastIndexOf('.')
    )
    logMessageForFunction('generateExportsFromPaths', { withoutExtension })
    const componentName = path.basename(filepath, path.extname(filepath))
    logMessageForFunction('generateExportsFromPaths', { componentName })
    const isPrimaryExportFile = fileName === config.primaryExportFile
    logMessageForFunction('generateExportsFromPaths', { isPrimaryExportFile })
    if (fileName) {
      buildExportsFromPaths({
        isPrimaryExportFile,
        fileName,
        fileContent,
        withoutExtension,
        filepath,
        componentName,
        usedFunctionNames,
        usedFunctionTypes,
        defaultExportString,
        results,
        config
      })
    } else {
      logColoredMessage(`Failed to get filename from path ${filepath}`, 'red')
    }
    index++ // Increment the index to move to the next path
  }

  const commentTitleForFile =
    config.title && config.description
      ? createTitleComment(config.title || '', config.description || '')
      : ''

  const endedAt = new Date().getTime()

  config.results.endTime = endedAt

  config.results.duration = getDuration(config.results.startTime, endedAt)

  const durationComment = createDurationComment(
    config.results.startTime,
    endedAt
  )

  return [
    ...results,
    ...defaultExportString,
    commentTitleForFile,
    durationComment
  ]
}
