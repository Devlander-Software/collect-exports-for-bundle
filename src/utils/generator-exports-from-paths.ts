import * as fs from 'fs'
import path from 'path'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { hasDefaultExport, hasNamedExports } from './export-patterns'
import { extractDefaultExportVariable } from './extract-default-export'
import { getFilenameFromPath } from './get-file-name-from-path'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'

export interface BuildExportsFromPathParams {
  isPrimaryExportFile: boolean
  fileName: string
  fileContent: string
  results: string[]
  withoutExtension: string
  filepath: string
  componentName: string
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
    filepath,
    defaultExportString,
    componentName,
    results,
    config
  } = params
  if (config.debug) {
    logColoredMessage(`Processing included file: ${filepath}...`, 'yellow')
  }
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
    hasNamedExports(fileContent)
  ) {
    results.push(`/**\n * TSDoc for ${componentName}\n */`)
    results.push(`export * from "${withoutExtension}";`)
  }

  return results
}

export function generateExportsFromPaths(
  paths: string[],
  config: AutoExporterOptions
): string[] {
  logColoredMessage(`Generating exports from provided paths...`, 'green')
  const results: string[] = []
  const defaultExportString: string[] = []
  if (!config.rootDir || config.rootDir === '') {
    throw new Error('rootDir is required')
  }

  for (const filepath of paths) {
    const fileName = getFilenameFromPath(filepath)
    const fileContent = fs.readFileSync(filepath, 'utf-8') // Reading the content of the file
    const relativePath = `./${path
      .relative(config.rootDir, filepath)
      .replace(/\\/g, '/')}`
    const withoutExtension = relativePath.substring(
      0,
      relativePath.lastIndexOf('.')
    )
    const componentName = path.basename(filepath, path.extname(filepath))
    const isPrimaryExportFile = fileName === config.primaryExportFile

    buildExportsFromPaths({
      isPrimaryExportFile,
      fileName,
      fileContent,
      withoutExtension,
      filepath,
      componentName,
      defaultExportString,
      results,
      config
    })
  }

  return [...results, ...defaultExportString]
}
