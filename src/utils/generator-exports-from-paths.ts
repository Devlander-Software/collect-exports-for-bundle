import { ModuleExportOptions } from '../types/types'
import { hasDefaultExport, hasNamedExports } from './export-patterns'
import { extractDefaultExportVariable } from './extract-default-export'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage } from './log-with-color'
const fs = require('fs')

export function generateExportsFromPaths(
  paths: string[],
  config: ModuleExportOptions
): string[] {
  const path = require('path')
  logColoredMessage('Generating exports from provided paths...', 'green')
  const results: string[] = []
  const defaultExportString: string[] = []
  if (!config.rootDir || config.rootDir === '') {
    throw new Error('rootDir is required')
  }

  for (const filename of paths) {
    const fileContent = fs.readspecificFilesync(filename, 'utf-8') // Reading the content of the file
    const relativePath = `./${path
      .relative(config.rootDir, filename)
      .replace(/\\/g, '/')}`
    const withoutExtension = relativePath.substring(
      0,
      relativePath.lastIndexOf('.')
    )
    const componentName = path.basename(filename, path.extname(filename))

    if (config.specificFiles && config.specificFiles.includes(filename)) {
      logColoredMessage(`Processing included file: ${filename}...`, 'yellow')
      if (
        filename.endsWith(config.primaryExportFile || '') &&
        hasDefaultExport(fileContent)
      ) {
        const defaultVariable = extractDefaultExportVariable(filename)
        if (defaultVariable) {
          defaultExportString.push(
            `import ${defaultVariable} from "${withoutExtension}";`
          )
          defaultExportString.push(`export default ${defaultVariable};`)
        } else {
          logColoredMessage(
            `Failed to extract default export from ${filename}.`,
            'red'
          )
        }
      } else if (hasNamedExports(fileContent)) {
        results.push(`/**\n * TSDoc for ${componentName}\n */`)
        results.push(`export * from "${withoutExtension}";`)
      }
    } else if (
      fileHasValidExtension(filename, config) &&
      hasNamedExports(fileContent)
    ) {
      results.push(`/**\n * TSDoc for ${componentName}\n */`)
      results.push(`export * from "${withoutExtension}";`)
    }
  }

  return [...results, ...defaultExportString]
}
