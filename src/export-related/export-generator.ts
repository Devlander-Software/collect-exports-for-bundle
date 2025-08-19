import { ModuleExportOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'

export interface ExportStrategy {
  name: string
  description: string
  generateExports(files: string[], config: ModuleExportOptions): ExportOutput
}

export interface ExportOutput {
  imports: string[]
  exports: string[]
  defaultExport?: string
  bundleObject?: string
  header: string[]
}

export interface ExportFile {
  path: string
  name: string
  relativePath: string
  hasDefaultExport: boolean
  hasNamedExports: boolean
  exports: string[]
}

// Enhanced configuration interface for Rollup compatibility
export interface RollupCompatibilityConfig {
  rollupCompatible: boolean
  includeExtensions: boolean
  bundlerTarget: 'rollup' | 'webpack' | 'vite' | 'parcel' | 'node'
  pathResolution: {
    mode: 'bundler' | 'node' | 'auto'
    extensions: string[]
    resolveStrategy: 'explicit' | 'implicit' | 'smart'
  }
  typescript: {
    generateBarrelExports: boolean
    includeTypeOnlyExports: boolean
    preserveJSDocComments: boolean
    exportStrategy: 'minimal' | 'comprehensive' | 'selective'
  }
  validation: {
    validatePaths: boolean
    checkCircularDependencies: boolean
    validateTypeScript: boolean
    failOnErrors: boolean
  }
  performance: {
    enableCaching: boolean
    cacheDirectory: string
    incrementalGeneration: boolean
    parallelProcessing: boolean
  }
}

/**
 * Clean export generator that eliminates conflicts between different export modes
 * and provides comprehensive Rollup compatibility
 */
export class ExportGenerator {
  private config: ModuleExportOptions
  private rollupConfig: RollupCompatibilityConfig

  constructor(config: ModuleExportOptions) {
    this.config = config
    this.rollupConfig = this.initializeRollupConfig()
  }

  /**
   * Initialize Rollup compatibility configuration with defaults
   */
  private initializeRollupConfig(): RollupCompatibilityConfig {
    return {
      rollupCompatible: this.config.rollupCompatible || false,
      includeExtensions: this.config.includeExtensions || false,
      bundlerTarget: this.config.bundlerTarget || 'node',
      pathResolution: {
        mode: this.config.pathResolution?.mode || 'auto',
        extensions: this.config.pathResolution?.extensions || ['.ts', '.tsx'],
        resolveStrategy: this.config.pathResolution?.resolveStrategy || 'smart'
      },
      typescript: {
        generateBarrelExports: this.config.typescript?.generateBarrelExports || false,
        includeTypeOnlyExports: this.config.typescript?.includeTypeOnlyExports || true,
        preserveJSDocComments: this.config.typescript?.preserveJSDocComments || true,
        exportStrategy: this.config.typescript?.exportStrategy || 'comprehensive'
      },
      validation: {
        validatePaths: this.config.validation?.validatePaths || false,
        checkCircularDependencies: this.config.validation?.checkCircularDependencies || false,
        validateTypeScript: this.config.validation?.validateTypeScript || false,
        failOnErrors: this.config.validation?.failOnErrors || false
      },
      performance: {
        enableCaching: this.config.performance?.enableCaching || false,
        cacheDirectory: this.config.performance?.cacheDirectory || '.auto-export-cache',
        incrementalGeneration: this.config.performance?.incrementalGeneration || false,
        parallelProcessing: this.config.performance?.parallelProcessing || false
      }
    }
  }

  /**
   * Main entry point - generates exports based on configuration
   */
  generateExports(files: string[]): ExportOutput {
    if (this.config.debug) {
      logColoredMessage('Starting export generation...', 'blue')
      logColoredMessage(`Export mode: ${this.config.exportMode}`, 'blue')
      logColoredMessage(`Files: ${files.length}`, 'blue')
      logColoredMessage(`Bundler target: ${this.rollupConfig.bundlerTarget}`, 'blue')
      logColoredMessage(`Rollup compatible: ${this.rollupConfig.rollupCompatible}`, 'blue')
    }

    // Parse files to understand their export structure
    const exportFiles = this.parseFiles(files)
    
    // Choose the appropriate export strategy
    const strategy = this.selectExportStrategy()
    
    // Generate exports using the selected strategy
    const output = strategy.generateExports(files, this.config)
    
    // Add header information
    output.header = this.generateHeader()
    
    // Apply Rollup compatibility transformations
    if (this.rollupConfig.rollupCompatible) {
      output.exports = this.applyRollupCompatibility(output.exports)
    }
    
    // Validate exports if enabled
    if (this.rollupConfig.validation.validatePaths) {
      this.validateExportPaths(output.exports)
    }
    
    if (this.config.debug) {
      logColoredMessage(`Generated ${output.exports.length} exports`, 'green')
      if (output.defaultExport) {
        logColoredMessage('Generated default export', 'green')
      }
      if (output.bundleObject) {
        logColoredMessage('Generated bundle object', 'green')
      }
    }

    return output
  }

  /**
   * Apply Rollup compatibility transformations to export paths
   */
  private applyRollupCompatibility(exports: string[]): string[] {
    return exports.map(exportStatement => {
      // Add file extensions for Rollup compatibility
      if (this.rollupConfig.includeExtensions) {
        return this.addFileExtensions(exportStatement)
      }
      return exportStatement
    })
  }

  /**
   * Add file extensions to export paths for Rollup compatibility
   */
  private addFileExtensions(exportStatement: string): string {
    // Match export * from "path" patterns
    const exportPattern = /export \* from ['"]([^'"]+)['"];?/g
    return exportStatement.replace(exportPattern, (match, path) => {
      // Add .ts extension if not already present
      if (!path.endsWith('.ts') && !path.endsWith('.tsx') && !path.endsWith('.js') && !path.endsWith('.jsx')) {
        return `export * from "${path}.ts";`
      }
      return match
    })
  }

  /**
   * Validate export paths exist
   */
  private validateExportPaths(exports: string[]): void {
    const fs = require('fs')
    const path = require('path')
    
    for (const exportStatement of exports) {
      const pathMatch = exportStatement.match(/from ['"]([^'"]+)['"]/)
      if (pathMatch) {
        const exportPath = pathMatch[1]
        const fullPath = path.join(this.config.rootDir || 'src', exportPath)
        
        if (!fs.existsSync(fullPath)) {
          const error = `Export path not found: ${exportPath} (resolved to: ${fullPath})`
          if (this.rollupConfig.validation.failOnErrors) {
            throw new Error(error)
          } else {
            logColoredMessage(error, 'red')
          }
        }
      }
    }
  }

  /**
   * Parse files to understand their export structure
   */
  private parseFiles(files: string[]): ExportFile[] {
    return files.map(file => {
      const name = this.extractFileName(file)
      const relativePath = this.makeRelativePath(file)
      
      return {
        path: file,
        name,
        relativePath,
        hasDefaultExport: false, // Will be populated by actual parsing
        hasNamedExports: true,   // Will be populated by actual parsing
        exports: []              // Will be populated by actual parsing
      }
    })
  }

  /**
   * Select the appropriate export strategy based on configuration
   */
  private selectExportStrategy(): ExportStrategy {
    if (this.config.bundleAsObjectForDefaultExport) {
      return new BundleObjectStrategy()
    } else if (this.config.primaryExportFile) {
      return new PrimaryFileStrategy()
    } else {
      return new StandardStrategy()
    }
  }

  /**
   * Generate header information for the export file
   */
  private generateHeader(): string[] {
    const header: string[] = []
    
    if (this.config.title || this.config.description) {
      header.push('/**')
      if (this.config.title) {
        header.push(` * ${this.config.title}`)
      }
      if (this.config.description) {
        header.push(` * ${this.config.description}`)
      }
      header.push(' * Generated automatically by @devlander/collect-exports-for-bundle')
      header.push(' */')
      header.push('')
    }

    return header
  }

  /**
   * Extract file name without extension
   */
  private extractFileName(filePath: string): string {
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || ''
    return fileName.split('.')[0]
  }

  /**
   * Make path relative to root directory
   */
  private makeRelativePath(filePath: string): string {
    const rootDir = this.config.rootDir || 'src'
    const relativePath = filePath.replace(rootDir, '.').replace(/\\/g, '/')
    return relativePath.startsWith('./') ? relativePath : `./${relativePath}`
  }
}

/**
 * Strategy 1: Bundle everything into a single object
 * This eliminates the conflict between primaryExportFile and bundleAsObjectForDefaultExport
 */
class BundleObjectStrategy implements ExportStrategy {
  name = 'Bundle Object'
  description = 'Bundles all exports into a single object'

  generateExports(files: string[], config: ModuleExportOptions): ExportOutput {
    const imports: string[] = []
    const exports: string[] = []
    const bundleExports: string[] = []

    files.forEach(file => {
      const fileName = this.extractFileName(file)
      const relativePath = this.makeRelativePath(file, config.rootDir || 'src')
      
      // Import each file's default export
      imports.push(`import { default as ${fileName} } from '${relativePath}';`)
      
      // Add to bundle exports
      bundleExports.push(`  ${fileName},`)
    })

    const bundleObject = `export default {\n${bundleExports.join('\n')}\n};`

    return {
      imports,
      exports,
      bundleObject,
      header: []
    }
  }

  private extractFileName(filePath: string): string {
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || ''
    return fileName.split('.')[0]
  }

  private makeRelativePath(filePath: string, rootDir: string): string {
    const relativePath = filePath.replace(rootDir, '.').replace(/\\/g, '/')
    return relativePath.startsWith('./') ? relativePath : `./${relativePath}`
  }
}

/**
 * Strategy 2: Primary file gets default export, others get named exports
 */
class PrimaryFileStrategy implements ExportStrategy {
  name = 'Primary File'
  description = 'Primary file gets default export, others get named exports'

  generateExports(files: string[], config: ModuleExportOptions): ExportOutput {
    const imports: string[] = []
    const exports: string[] = []
    let defaultExport: string | undefined

    files.forEach(file => {
      const fileName = this.extractFileName(file)
      const relativePath = this.makeRelativePath(file, config.rootDir || 'src')
      
      // Check if this is the primary export file
      const isPrimaryFile = config.primaryExportFile && typeof config.primaryExportFile === 'string' && file.includes(config.primaryExportFile)
      
      if (isPrimaryFile) {
        // Primary file gets default export
        defaultExport = `export { default } from '${relativePath}';`
        
        // Also add named exports if mode supports it
        if (config.exportMode === 'both') {
          exports.push(`export * from '${relativePath}';`)
        }
      } else {
        // Other files get named exports
        if (config.exportMode === 'named' || config.exportMode === 'both') {
          exports.push(`export * from '${relativePath}';`)
        }
        
        // Add named default export if mode supports it
        if (config.exportMode === 'default' || config.exportMode === 'both') {
          exports.push(`export { default as ${fileName} } from '${relativePath}';`)
        }
      }
    })

    return {
      imports,
      exports,
      defaultExport,
      header: []
    }
  }

  private extractFileName(filePath: string): string {
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || ''
    return fileName.split('.')[0]
  }

  private makeRelativePath(filePath: string, rootDir: string): string {
    const relativePath = filePath.replace(rootDir, '.').replace(/\\/g, '/')
    return relativePath.startsWith('./') ? relativePath : `./${relativePath}`
  }
}

/**
 * Strategy 3: Standard export generation based on mode
 */
class StandardStrategy implements ExportStrategy {
  name = 'Standard'
  description = 'Standard export generation based on export mode'

  generateExports(files: string[], config: ModuleExportOptions): ExportOutput {
    const imports: string[] = []
    const exports: string[] = []

    files.forEach(file => {
      const fileName = this.extractFileName(file)
      const relativePath = this.makeRelativePath(file, config.rootDir || 'src')
      
      // Generate exports based on mode
      if (config.exportMode === 'named' || config.exportMode === 'both') {
        exports.push(`export * from '${relativePath}';`)
      }
      
      if (config.exportMode === 'default' || config.exportMode === 'both') {
        exports.push(`export { default as ${fileName} } from '${relativePath}';`)
      }
    })

    return {
      imports,
      exports,
      header: []
    }
  }

  private extractFileName(filePath: string): string {
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || ''
    return fileName.split('.')[0]
  }

  private makeRelativePath(filePath: string, rootDir: string): string {
    const relativePath = filePath.replace(rootDir, '.').replace(/\\/g, '/')
    return relativePath.startsWith('./') ? relativePath : `./${relativePath}`
  }
}

/**
 * Convenience function to generate exports
 */
export function generateExports(files: string[], config: ModuleExportOptions): ExportOutput {
  const generator = new ExportGenerator(config)
  return generator.generateExports(files)
}

/**
 * Format export output into a string
 */
export function formatExportOutput(output: ExportOutput): string {
  const lines: string[] = []

  // Add header
  lines.push(...output.header)

  // Add imports
  if (output.imports.length > 0) {
    lines.push('// Import statements')
    lines.push(...output.imports)
    lines.push('')
  }

  // Add exports
  if (output.exports.length > 0) {
    lines.push('// Named exports')
    lines.push(...output.exports)
    lines.push('')
  }

  // Add default export
  if (output.defaultExport) {
    lines.push('// Default export')
    lines.push(output.defaultExport)
    lines.push('')
  }

  // Add bundle object
  if (output.bundleObject) {
    lines.push('// Bundle object')
    lines.push(output.bundleObject)
  }

  return lines.join('\n')
}
