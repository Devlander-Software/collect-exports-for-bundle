import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'

export interface ExportStatementOptions {
  componentName: string
  withoutExtension: string
  targetVersion: 'es5' | 'es6'
  exportType: 'named' | 'default' | 'both'
  config: AutoExporterOptions
  alias?: string
}

export function generateExportStatement(
  componentName: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6',
  config: AutoExporterOptions,
  alias?: string
): string {
  if (config.debug) {
    logColoredMessage(
      `Generating export statement for ${componentName}`,
      'yellow'
    )
    logColoredMessage(`Target version: ${targetVersion}`, 'yellow')
    logColoredMessage(`Export mode: ${config.exportMode}`, 'yellow')
  }

  // Check if component should be ignored
  if (
    config.ignoredExtensions &&
    config.ignoredExtensions.includes(componentName)
  ) {
    if (config.debug) {
      logColoredMessage(`Skipping ${componentName} - in ignored extensions`, 'yellow')
    }
    return ''
  }

  const statements: string[] = []

  // Handle named exports
  if (config.exportMode === 'named' || config.exportMode === 'both') {
    if (targetVersion === 'es6') {
      statements.push(`export * from "${withoutExtension}";`)
    } else {
      statements.push(`const ${componentName} = require("${withoutExtension}");`)
      statements.push(`exports.${componentName} = ${componentName};`)
    }
  }

  // Handle default exports
  if (config.exportMode === 'default' || config.exportMode === 'both') {
    if (config.bundleAsObjectForDefaultExport) {
      // Bundle as object with alias
      if (targetVersion === 'es6') {
        statements.push(`export { default as ${alias || componentName} } from "${withoutExtension}";`)
      } else {
        statements.push(`const ${alias || componentName} = require("${withoutExtension}").default;`)
        statements.push(`exports.${alias || componentName} = ${alias || componentName};`)
      }
    } else {
      // Regular default export
      if (targetVersion === 'es6') {
        statements.push(`export { default } from "${withoutExtension}";`)
      } else {
        statements.push(`const ${componentName} = require("${withoutExtension}").default;`)
        statements.push(`exports.${componentName} = ${componentName};`)
      }
    }
  }

  // Add TSDoc comment
  if (statements.length > 0) {
    const tsDoc = `/**\n * TSDoc for ${componentName}\n */`
    return statements.map(statement => `${tsDoc}\n${statement}`).join('\n')
  }

  if (config.debug) {
    logColoredMessage(
      `No export statements generated for ${componentName}`,
      'yellow'
    )
  }

  return ''
}

// Convenience function for generating mixed export statements
export function generateMixedExportStatement(
  options: ExportStatementOptions
): string {
  const { componentName, withoutExtension, targetVersion, exportType, config, alias } = options

  if (config.debug) {
    logColoredMessage(
      `Generating mixed export statement for ${componentName}`,
      'yellow'
    )
  }

  const statements: string[] = []

  // Generate named export
  if (exportType === 'named' || exportType === 'both') {
    if (targetVersion === 'es6') {
      statements.push(`export * from "${withoutExtension}";`)
    } else {
      statements.push(`const ${componentName} = require("${withoutExtension}");`)
      statements.push(`exports.${componentName} = ${componentName};`)
    }
  }

  // Generate default export
  if (exportType === 'default' || exportType === 'both') {
    if (targetVersion === 'es6') {
      statements.push(`export { default } from "${withoutExtension}";`)
    } else {
      statements.push(`const ${componentName}Default = require("${withoutExtension}").default;`)
      statements.push(`exports.${componentName}Default = ${componentName}Default;`)
    }
  }

  if (statements.length > 0) {
    const tsDoc = `/**\n * Mixed exports for ${componentName}\n */`
    return statements.map(statement => `${tsDoc}\n${statement}`).join('\n')
  }

  return ''
}
