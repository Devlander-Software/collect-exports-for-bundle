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
  withoutExtension: string,
  config: AutoExporterOptions
): string[] {
  const results: string[] = []

  if (!matchItem) return results

  // Handle named exports for functions
  const namedExports = matchItem.functionNames
    ?.filter(({ exportType }) => exportType === 'named')
    .map(({ name }) => name)

  if (namedExports && namedExports.length > 0) {
    if (config.exportMode === 'named' || config.exportMode === 'both') {
      results.push(
        `export {${namedExports.join(', ')}} from '${withoutExtension}';`
      )
    }
  }

  // Handle type exports
  const typeExports = matchItem.functionTypes
    ?.filter(({ exportType }) => exportType === 'named')
    .map(({ name }) => name)

  if (typeExports && typeExports.length > 0) {
    if (config.exportMode === 'named' || config.exportMode === 'both') {
      results.push(
        `export type {${typeExports.join(', ')}} from '${withoutExtension}';`
      )
    }
  }

  // Handle default exports
  const defaultExports = matchItem.functionNames
    ?.filter(({ exportType }) => exportType === 'default')
    .map(({ name }) => name)

  if (defaultExports && defaultExports.length > 0) {
    if (config.exportMode === 'default' || config.exportMode === 'both') {
      // For default exports, we can either export as default or add to bundle
      if (config.bundleAsObjectForDefaultExport) {
        // Add to bundle object
        results.push(
          `export { default as ${defaultExports[0]} } from '${withoutExtension}';`
        )
      } else {
        // Export as default
        results.push(
          `export { default } from '${withoutExtension}';`
        )
      }
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

    if (config.debug) {
      logColoredMessage(`Processing included file: ${filepath}...`, 'yellow')
    }

    // Check if this file has valid extensions
    if (!fileHasValidExtension(filepath, config)) {
      if (config.debug) {
        logColoredMessage(`Skipping ${fileName} - invalid extension`, 'yellow')
      }
      return results
    }

    // Create export matches for this file
    const exportsFromFile = createExportMatches(
      [filepath],
      usedFunctionNames,
      usedFunctionTypes
    )

    if (config.debug) {
      logColoredMessage(`Exports from file: ${JSON.stringify(exportsFromFile)}`, 'yellow')
    }

    // Handle primary export file logic
    const hasDefaultExport = extractDefaultExportVariable(fileContent) || ''
    const isPrimaryExportFile = fileName === config.primaryExportFile

    if (config.debug) {
      logColoredMessage(`isPrimaryExportFile: ${isPrimaryExportFile}`, 'yellow')
      logColoredMessage(`hasDefaultExport: ${hasDefaultExport}`, 'yellow')
    }

    // Process exports based on configuration
    if (exportsFromFile.length > 0) {
      const matchItem = exportsFromFile[0]
      const matchItemResults = processMatchItem(matchItem, withoutExtension, config)
      results.push(...matchItemResults)

      // Handle primary export file default export
      if (isPrimaryExportFile && hasDefaultExport !== '') {
        const defaultVariable = extractDefaultExportVariable(filepath)
        if (defaultVariable) {
          // Add import statement
          if (
            !defaultExportString.includes(
              `import ${defaultVariable} from "${withoutExtension}";`
            )
          ) {
            defaultExportString.push(
              `import ${defaultVariable} from "${withoutExtension}";`
            )
          }

          // Add default export based on mode
          if (config.exportMode === 'default' || config.exportMode === 'both') {
            if (config.bundleAsObjectForDefaultExport) {
              // Bundle as object
              defaultExportString.push(
                `export { default as ${config.bundleAsObjectForDefaultExport} } from "${withoutExtension}";`
              )
            } else {
              // Regular default export
              defaultExportString.push(
                `export default ${defaultVariable};`
              )
            }
          }
        } else {
          logColoredMessage(
            `Failed to extract default export from ${fileName}.`,
            'red'
          )
        }
      }
    } else if (config.debug) {
      logColoredMessage(`No exports found in ${fileName}`, 'yellow')
    }

    return results
  } catch (err) {
    logFailedMessage('buildExportsFromPaths', err)
    console.log(err)
    return []
  }
}
