import { fileHasValidExtension } from '../extensions/has-valid-extension'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'
import { createExportMatches } from './create-export-matches'
import { extractDefaultExportVariable } from './extract-default-export'
import { processMatchItem } from './process-match-item'

export interface BuildExportsFromPathParams {
  fileName: string
  fileContent: string
  results: string[]
  usedFunctionTypes: Set<string>
  withoutExtension: string
  filepath: string
  usedFunctionNames: Set<string>
  defaultExportString: string[]
  config: AutoExporterOptions
}

export const buildExportsFromPaths = (
  params: BuildExportsFromPathParams
): string[] => {
  try {
    const {
      fileName,
      fileContent,
      withoutExtension,
      usedFunctionTypes,
      filepath,
      defaultExportString,
      results,
      usedFunctionNames,
      config
    } = params

    //   console.log('hi hi hi hi hi hi hi ')
    //   console.log(config.debug, 'config.debug')
    //   console.log(fileContent, 'fileContent')
    //   console.log(fileName, 'fileName')
    if (config.debug) {
      logColoredMessage(`Processing included file: ${filepath}...`, 'yellow')
    }

    const hasDefaultExport = extractDefaultExportVariable(fileContent) || ''
    const isPrimaryExportFile = fileName === config.primaryExportFile

    if (config.debug) {
      logColoredMessage(`isPrimaryExportFile: ${isPrimaryExportFile}`, 'yellow')
      logColoredMessage(`hasDefaultExport: ${hasDefaultExport}`, 'yellow')
    }

    const exportsFromFile = createExportMatches(
      [filepath],
      usedFunctionNames,
      usedFunctionTypes
    )

    const processedMatchItem = processMatchItem(
      exportsFromFile[0],
      withoutExtension,
      config.primaryExportFile ? config.primaryExportFile : undefined
    )

    console.log(processedMatchItem, 'processedMatchItem')

    if (isPrimaryExportFile && hasDefaultExport !== '') {
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
      const exportsFromFile = createExportMatches(
        [filepath],
        usedFunctionNames,
        usedFunctionTypes
      )

      // Refactored logic using the helper function
      if (fileHasValidExtension(filepath, config)) {
        const matchItem = exportsFromFile[0]
        const matchItemResults = processMatchItem(matchItem, withoutExtension)
        results.push(...matchItemResults)
      }
    }

    return results
  } catch (err) {
    logFailedMessage('buildExportsFromPaths', err)
    console.log(err)
    return []
  }
}
