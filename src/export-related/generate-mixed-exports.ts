import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'

export interface MixedExportOptions {
  files: string[]
  config: AutoExporterOptions
  primaryExportFile?: string
  bundleAsObject?: string
}

export interface ExportResult {
  namedExports: string[]
  defaultExports: string[]
  typeExports: string[]
  bundleObject?: string
  imports: string[]
}

/**
 * Generates mixed exports that include both named and default exports
 * This allows for more flexible export patterns
 */
export function generateMixedExports(options: MixedExportOptions): ExportResult {
  const { files, config, primaryExportFile, bundleAsObject } = options
  
  if (config.debug) {
    logColoredMessage('Generating mixed exports...', 'blue')
    logColoredMessage(`Files: ${files.length}`, 'blue')
    logColoredMessage(`Export mode: ${config.exportMode}`, 'blue')
  }

  const result: ExportResult = {
    namedExports: [],
    defaultExports: [],
    typeExports: [],
    imports: []
  }

  // Process each file
  files.forEach(file => {
    const fileName = file.split('/').pop()?.split('.')[0] || ''
    const relativePath = file.replace(config.rootDir, '.').replace(/\\/g, '/')
    
    if (config.debug) {
      logColoredMessage(`Processing file: ${fileName}`, 'yellow')
    }

    // Generate named exports
    if (config.exportMode === 'named' || config.exportMode === 'both') {
      result.namedExports.push(`export * from '${relativePath}';`)
    }

    // Generate default exports
    if (config.exportMode === 'default' || config.exportMode === 'both') {
      if (bundleAsObject) {
        // Bundle as object with alias
        result.defaultExports.push(`export { default as ${fileName} } from '${relativePath}';`)
      } else if (file === primaryExportFile) {
        // Primary export file gets the default export
        result.defaultExports.push(`export { default } from '${relativePath}';`)
      } else {
        // Other files get named default exports
        result.defaultExports.push(`export { default as ${fileName} } from '${relativePath}';`)
      }
    }

    // Add import for bundling
    if (bundleAsObject) {
      result.imports.push(`import { default as ${fileName} } from '${relativePath}';`)
    }
  })

  // Generate bundle object if requested
  if (bundleAsObject && result.imports.length > 0) {
    const bundleExports = files.map(file => {
      const fileName = file.split('/').pop()?.split('.')[0] || ''
      return `  ${fileName},`
    }).join('\n')

    result.bundleObject = `export default {\n${bundleExports}\n};`
  }

  if (config.debug) {
    logColoredMessage(`Generated ${result.namedExports.length} named exports`, 'green')
    logColoredMessage(`Generated ${result.defaultExports.length} default exports`, 'green')
    if (result.bundleObject) {
      logColoredMessage('Generated bundle object', 'green')
    }
  }

  return result
}

/**
 * Formats the mixed exports into a final output string
 */
export function formatMixedExports(result: ExportResult, config: AutoExporterOptions): string {
  const lines: string[] = []

  // Add header comment
  if (config.title || config.description) {
    lines.push('/**')
    if (config.title) {
      lines.push(` * ${config.title}`)
    }
    if (config.description) {
      lines.push(` * ${config.description}`)
    }
    lines.push(' * Generated automatically by @devlander/collect-exports-for-bundle')
    lines.push(' */')
    lines.push('')
  }

  // Add imports for bundling
  if (result.imports.length > 0) {
    lines.push('// Import statements for bundling')
    lines.push(...result.imports)
    lines.push('')
  }

  // Add named exports
  if (result.namedExports.length > 0) {
    lines.push('// Named exports')
    lines.push(...result.namedExports)
    lines.push('')
  }

  // Add default exports
  if (result.defaultExports.length > 0) {
    lines.push('// Default exports')
    lines.push(...result.defaultExports)
    lines.push('')
  }

  // Add bundle object
  if (result.bundleObject) {
    lines.push('// Bundle object')
    lines.push(result.bundleObject)
  }

  return lines.join('\n')
}

/**
 * Smart export generator that chooses the best export strategy
 */
export function generateSmartExports(options: MixedExportOptions): string {
  const { config } = options

  // Generate mixed exports
  const result = generateMixedExports(options)

  // Format based on export mode
  if (config.exportMode === 'both') {
    return formatMixedExports(result, config)
  } else if (config.exportMode === 'named') {
    return formatMixedExports({ ...result, defaultExports: [] }, config)
  } else if (config.exportMode === 'default') {
    return formatMixedExports({ ...result, namedExports: [] }, config)
  }

  return formatMixedExports(result, config)
}
