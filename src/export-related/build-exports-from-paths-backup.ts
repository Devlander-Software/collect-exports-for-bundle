import { fileHasValidExtension } from '../extensions/has-valid-extension'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'
import { MatchItem, createExportMatches } from './create-export-matches'
import { extractDefaultExportVariable } from './extract-default-export'

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
function processMatchItem(
  matchItem: MatchItem,
  withoutExtension: string
): string[] {
  const results = []
  console.log(matchItem, 'matchItem this is match item')
  // break apart the path, check the last item
  // if it's index, then mark isFromIndex as true
  const isFromIndex = matchItem.path.split('/').pop()?.includes('index')
    ? true
    : false

  console.log(withoutExtension, 'withoutExtension')
  console.log(isFromIndex, 'isFromIndex')

  if (matchItem) {
    const namedExports = matchItem.functionNames
      ?.filter(({ exportType }) => exportType === 'named')
      .map(({ name }) => name)

    if (namedExports && namedExports.length > 0) {
      results.push(
        `export {${namedExports.join(', ')}} from '${withoutExtension}';`
      )
    }

    const typeExports = matchItem.functionTypes
      ?.filter(({ exportType }) => exportType === 'named')
      .map(({ name }) => name)

    if (typeExports && typeExports.length > 0) {
      results.push(
        `export type {${typeExports.join(', ')}} from '${withoutExtension}';`
      )
    }
  }

  return results
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
