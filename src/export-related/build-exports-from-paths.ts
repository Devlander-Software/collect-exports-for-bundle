import { isFileExcludedByDirective } from '../features/directive-parser'
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
/** Use inline type keyword: export { type X, type Y, Func } from '...' (TS 4.5+, rollup-plugin-dts friendly) */
function processMatchItem(
  matchItem: MatchItem,
  withoutExtension: string,
  useInlineTypeKeyword = false
): string[] {
  const results: string[] = []

  if (!matchItem) return results

  const namedExports =
    matchItem.functionNames?.filter(
      ({ exportType }) => exportType === 'named'
    ) ?? []
  const typeExports = matchItem.functionTypes ?? []

  if (
    useInlineTypeKeyword &&
    (namedExports.length > 0 || typeExports.length > 0)
  ) {
    const typeItems = typeExports.map((t) => `type ${t.name}`)
    const valueItems = namedExports.map((n) => n.name)
    const allItems = [...typeItems, ...valueItems]
    if (allItems.length > 0) {
      results.push(
        `export { ${allItems.join(', ')} } from '${withoutExtension}';`
      )
    }
  } else {
    if (namedExports.length > 0) {
      results.push(
        `export {${namedExports
          .map((n) => n.name)
          .join(', ')}} from '${withoutExtension}';`
      )
    }
    if (typeExports.length > 0) {
      results.push(
        `export type {${typeExports
          .map((t) => t.name)
          .join(', ')}} from '${withoutExtension}';`
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
    if (isFileExcludedByDirective(filepath, fileContent)) {
      if (config.debug) {
        logColoredMessage(
          `Skipping file (excluded by directive): ${filepath}`,
          'yellow'
        )
      }
      return results
    }

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

    if (config.debug) {
      logColoredMessage(
        `Exports from file: ${JSON.stringify(exportsFromFile)}`,
        'yellow'
      )
    }
    if (isPrimaryExportFile && hasDefaultExport !== '') {
      const defaultVariable = extractDefaultExportVariable(fileContent)
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
      const useInlineType = config.useTypeScriptAPI === true
      const matchItemResults = processMatchItem(
        matchItem,
        withoutExtension,
        useInlineType
      )
      results.push(...matchItemResults)
    }

    return results
  } catch (err) {
    logFailedMessage('buildExportsFromPaths', err)
    return []
  }
}
