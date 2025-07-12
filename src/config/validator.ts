import * as fs from 'fs'
import * as path from 'path'
import { ModuleExportOptions, AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

export interface ConfigValidationOptions {
  checkFileSystem?: boolean
  strict?: boolean
  suggestImprovements?: boolean
}

/**
 * Validates configuration options and provides helpful feedback
 */
export class ConfigValidator {
  private options: ConfigValidationOptions

  constructor(options: ConfigValidationOptions = {}) {
    this.options = {
      checkFileSystem: true,
      strict: false,
      suggestImprovements: true,
      ...options
    }
  }

  /**
   * Validate a configuration object
   */
  validateConfig(config: ModuleExportOptions): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const suggestions: string[] = []

    // Required fields validation
    this.validateRequiredFields(config, errors)

    // Type validation
    this.validateTypes(config, errors)

    // Value validation
    this.validateValues(config, errors, warnings)

    // File system validation
    if (this.options.checkFileSystem) {
      this.validateFileSystem(config, errors, warnings)
    }

    // Performance and best practices
    if (this.options.suggestImprovements) {
      this.suggestImprovements(config, suggestions)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    }
  }

  private validateRequiredFields(config: ModuleExportOptions, errors: string[]) {
    if (!config.rootDir) {
      errors.push('rootDir is required')
    }
  }

  private validateTypes(config: ModuleExportOptions, errors: string[]) {
    // Validate allowedExtensions
    if (config.allowedExtensions && !Array.isArray(config.allowedExtensions)) {
      errors.push('allowedExtensions must be an array')
    }

    // Validate ignoredExtensions
    if (config.ignoredExtensions && !Array.isArray(config.ignoredExtensions)) {
      errors.push('ignoredExtensions must be an array')
    }

    // Validate excludedFolders
    if (config.excludedFolders && !Array.isArray(config.excludedFolders)) {
      errors.push('excludedFolders must be an array')
    }

    // Validate outputFilenameExtension
    if (config.outputFilenameExtension && !['.ts', '.tsx'].includes(config.outputFilenameExtension)) {
      errors.push('outputFilenameExtension must be either ".ts" or ".tsx"')
    }

    // Validate exportMode
    if (config.exportMode && !['named', 'default', 'both'].includes(config.exportMode)) {
      errors.push('exportMode must be "named", "default", or "both"')
    }
  }

  private validateValues(config: ModuleExportOptions, errors: string[], warnings: string[]) {
    // Validate allowedExtensions
    if (config.allowedExtensions) {
      config.allowedExtensions.forEach(ext => {
        if (!ext.startsWith('.')) {
          errors.push(`Extension "${ext}" must start with a dot`)
        }
        if (ext.length < 2) {
          errors.push(`Extension "${ext}" is too short`)
        }
      })
    }

    // Validate ignoredExtensions
    if (config.ignoredExtensions) {
      config.ignoredExtensions.forEach(ext => {
        if (!ext.startsWith('.')) {
          errors.push(`Ignored extension "${ext}" must start with a dot`)
        }
      })
    }

    // Check for conflicts between allowed and ignored extensions
    if (config.allowedExtensions && config.ignoredExtensions) {
      const conflicts = config.allowedExtensions.filter(ext => 
        config.ignoredExtensions!.includes(ext)
      )
      if (conflicts.length > 0) {
        warnings.push(`Extensions ${conflicts.join(', ')} are both allowed and ignored`)
      }
    }

    // Validate specificFiles
    if (config.specificFiles && config.specificFiles.length > 0) {
      config.specificFiles.forEach((file: string) => {
        if (!file.includes('.')) {
          warnings.push(`Specific file "${file}" has no extension`)
        }
      })
    }
  }

  private validateFileSystem(config: ModuleExportOptions, errors: string[], warnings: string[]) {
    if (!config.rootDir) return

    // Check if rootDir exists
    if (!fs.existsSync(config.rootDir)) {
      errors.push(`Root directory "${config.rootDir}" does not exist`)
      return
    }

    // Check if rootDir is a directory
    const stat = fs.statSync(config.rootDir)
    if (!stat.isDirectory()) {
      errors.push(`"${config.rootDir}" is not a directory`)
      return
    }

    // Check for files in rootDir
    try {
      const files = fs.readdirSync(config.rootDir)
      const hasFiles = files.some(file => {
        const fullPath = path.join(config.rootDir!, file)
        return fs.statSync(fullPath).isFile()
      })

      if (!hasFiles) {
        warnings.push(`No files found in "${config.rootDir}"`)
      }
    } catch (error) {
      warnings.push(`Cannot read directory "${config.rootDir}": ${error}`)
    }

    // Validate excludedFolders exist
    if (config.excludedFolders) {
      config.excludedFolders.forEach(folder => {
        const fullPath = path.join(config.rootDir!, folder)
        if (fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()) {
          warnings.push(`Excluded folder "${folder}" exists but is not a directory`)
        }
      })
    }
  }

  private suggestImprovements(config: ModuleExportOptions, suggestions: string[]) {
    // Suggest better default extensions
    if (!config.allowedExtensions || config.allowedExtensions.length === 0) {
      suggestions.push('Consider adding allowedExtensions for better control')
    }

    // Suggest ignoredExtensions for common test files
    if (!config.ignoredExtensions || config.ignoredExtensions.length === 0) {
      suggestions.push('Consider adding ignoredExtensions to exclude test files')
    }

    // Suggest excludedFolders for common build directories
    if (!config.excludedFolders || config.excludedFolders.length === 0) {
      suggestions.push('Consider adding excludedFolders like ["node_modules", "dist", "build"]')
    }

    // Suggest better export mode
    if (!config.exportMode) {
      suggestions.push('Consider setting exportMode based on your use case')
    }

    // Suggest outputFileName
    if (!config.outputFileName) {
      suggestions.push('Consider setting outputFileName (defaults to "index")')
    }
  }

  /**
   * Print validation results in a user-friendly format
   */
  printValidationResult(result: ValidationResult): void {
    if (result.isValid) {
      logColoredMessage('✅ Configuration is valid!', 'green')
    } else {
      logColoredMessage('❌ Configuration has errors:', 'red')
      result.errors.forEach(error => {
        logColoredMessage(`  • ${error}`, 'red')
      })
    }

    if (result.warnings.length > 0) {
      logColoredMessage('\n⚠️  Warnings:', 'yellow')
      result.warnings.forEach(warning => {
        logColoredMessage(`  • ${warning}`, 'yellow')
      })
    }

    if (result.suggestions.length > 0) {
      logColoredMessage('\n💡 Suggestions:', 'blue')
      result.suggestions.forEach(suggestion => {
        logColoredMessage(`  • ${suggestion}`, 'blue')
      })
    }
  }

  /**
   * Auto-fix common configuration issues
   */
  autoFixConfig(config: ModuleExportOptions): ModuleExportOptions {
    const fixed = { ...config }

    // Add default allowedExtensions if missing
    if (!fixed.allowedExtensions || fixed.allowedExtensions.length === 0) {
      fixed.allowedExtensions = ['.ts', '.tsx']
    }

    // Add default ignoredExtensions if missing
    if (!fixed.ignoredExtensions || fixed.ignoredExtensions.length === 0) {
      fixed.ignoredExtensions = ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx']
    }

    // Add default excludedFolders if missing
    if (!fixed.excludedFolders || fixed.excludedFolders.length === 0) {
      fixed.excludedFolders = ['node_modules', 'dist', 'build']
    }

    // Set default exportMode if missing
    if (!fixed.exportMode) {
      fixed.exportMode = 'named'
    }

    // Set default outputFileName if missing
    if (!fixed.outputFileName) {
      fixed.outputFileName = 'index'
    }

    // Set default outputFilenameExtension if missing
    if (!fixed.outputFilenameExtension) {
      fixed.outputFilenameExtension = '.ts'
    }

    return fixed
  }
} 