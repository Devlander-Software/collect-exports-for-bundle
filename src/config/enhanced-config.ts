import { ModuleExportOptions, AutoExporterOptions } from '../types/module-exporter.types'
import { getPreset, listPresets, isValidPreset, PresetName } from './presets'
import { logColoredMessage } from '../utils/log-with-color'

export interface EnhancedConfigOptions {
  preset?: PresetName
  validate?: boolean
  autoFix?: boolean
  debug?: boolean
}

/**
 * Enhanced configuration system with presets and validation
 */
export class EnhancedConfig {
  private options: EnhancedConfigOptions

  constructor(options: EnhancedConfigOptions = {}) {
    this.options = {
      validate: true,
      autoFix: true,
      debug: false,
      ...options
    }
  }

  /**
   * Create configuration from preset
   */
  createFromPreset(presetName: PresetName, overrides?: Partial<ModuleExportOptions>): ModuleExportOptions {
    if (!isValidPreset(presetName)) {
      throw new Error(`Invalid preset: ${presetName}`)
    }

    const presetConfig = getPreset(presetName)
    const config = { ...presetConfig, ...overrides }

    if (this.options.debug) {
      logColoredMessage(`📋 Using preset: ${presetName}`, 'blue')
      logColoredMessage(`Configuration: ${JSON.stringify(config, null, 2)}`, 'blue')
    }

    return config
  }

  /**
   * List all available presets
   */
  listAvailablePresets(): void {
    const presets = listPresets()
    
    logColoredMessage('📋 Available Configuration Presets:', 'blue')
    presets.forEach(preset => {
      logColoredMessage(`  • ${preset.key}: ${preset.name}`, 'blue')
      logColoredMessage(`    ${preset.description}`, 'blue')
    })
  }

  /**
   * Validate configuration
   */
  validateConfig(config: ModuleExportOptions): boolean {
    const errors: string[] = []
    const warnings: string[] = []

    // Required fields
    if (!config.rootDir) {
      errors.push('rootDir is required')
    }

    // Type validation
    if (config.allowedExtensions && !Array.isArray(config.allowedExtensions)) {
      errors.push('allowedExtensions must be an array')
    }

    if (config.ignoredExtensions && !Array.isArray(config.ignoredExtensions)) {
      errors.push('ignoredExtensions must be an array')
    }

    if (config.excludedFolders && !Array.isArray(config.excludedFolders)) {
      errors.push('excludedFolders must be an array')
    }

    // Value validation
    if (config.outputFilenameExtension && !['.ts', '.tsx'].includes(config.outputFilenameExtension)) {
      errors.push('outputFilenameExtension must be either ".ts" or ".tsx"')
    }

    if (config.exportMode && !['named', 'default', 'both'].includes(config.exportMode)) {
      errors.push('exportMode must be "named", "default", or "both"')
    }

    // Extension validation
    if (config.allowedExtensions) {
      config.allowedExtensions.forEach(ext => {
        if (!ext.startsWith('.')) {
          errors.push(`Extension "${ext}" must start with a dot`)
        }
      })
    }

    if (config.ignoredExtensions) {
      config.ignoredExtensions.forEach(ext => {
        if (!ext.startsWith('.')) {
          errors.push(`Ignored extension "${ext}" must start with a dot`)
        }
      })
    }

    // Print results
    if (errors.length > 0) {
      logColoredMessage('❌ Configuration validation failed:', 'red')
      errors.forEach(error => {
        logColoredMessage(`  • ${error}`, 'red')
      })
      return false
    }

    if (warnings.length > 0) {
      logColoredMessage('⚠️  Configuration warnings:', 'yellow')
      warnings.forEach(warning => {
        logColoredMessage(`  • ${warning}`, 'yellow')
      })
    }

    if (errors.length === 0 && warnings.length === 0) {
      logColoredMessage('✅ Configuration is valid!', 'green')
    }

    return true
  }

  /**
   * Auto-fix common configuration issues
   */
  autoFixConfig(config: ModuleExportOptions): ModuleExportOptions {
    const fixed = { ...config }

    // Add defaults if missing
    if (!fixed.allowedExtensions || fixed.allowedExtensions.length === 0) {
      fixed.allowedExtensions = ['.ts', '.tsx']
      logColoredMessage('🔧 Added default allowedExtensions', 'yellow')
    }

    if (!fixed.ignoredExtensions || fixed.ignoredExtensions.length === 0) {
      fixed.ignoredExtensions = ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx']
      logColoredMessage('🔧 Added default ignoredExtensions', 'yellow')
    }

    if (!fixed.excludedFolders || fixed.excludedFolders.length === 0) {
      fixed.excludedFolders = ['node_modules', 'dist', 'build']
      logColoredMessage('🔧 Added default excludedFolders', 'yellow')
    }

    if (!fixed.exportMode) {
      fixed.exportMode = 'named'
      logColoredMessage('🔧 Set default exportMode to "named"', 'yellow')
    }

    if (!fixed.outputFileName) {
      fixed.outputFileName = 'index'
      logColoredMessage('🔧 Set default outputFileName to "index"', 'yellow')
    }

    if (!fixed.outputFilenameExtension) {
      fixed.outputFilenameExtension = '.ts'
      logColoredMessage('🔧 Set default outputFilenameExtension to ".ts"', 'yellow')
    }

    return fixed
  }

  /**
   * Create a complete configuration with validation and auto-fixing
   */
  createConfig(
    presetOrConfig: PresetName | ModuleExportOptions,
    overrides?: Partial<ModuleExportOptions>
  ): ModuleExportOptions {
    let config: ModuleExportOptions

    // Handle preset or direct config
    if (typeof presetOrConfig === 'string') {
      config = this.createFromPreset(presetOrConfig, overrides)
    } else {
      config = { ...presetOrConfig, ...overrides }
    }

    // Auto-fix if enabled
    if (this.options.autoFix) {
      config = this.autoFixConfig(config)
    }

    // Validate if enabled
    if (this.options.validate) {
      const isValid = this.validateConfig(config)
      if (!isValid && this.options.autoFix) {
        logColoredMessage('🔄 Attempting to auto-fix configuration...', 'yellow')
        config = this.autoFixConfig(config)
        this.validateConfig(config)
      }
    }

    return config
  }

  /**
   * Get configuration suggestions based on project structure
   */
  getSuggestions(config: ModuleExportOptions): string[] {
    const suggestions: string[] = []

    // Suggest better extensions based on common patterns
    if (config.allowedExtensions && config.allowedExtensions.includes('.tsx')) {
      suggestions.push('Consider adding ".component.tsx" for React components')
    }

    if (config.allowedExtensions && config.allowedExtensions.includes('.ts')) {
      suggestions.push('Consider adding ".type.ts" and ".interface.ts" for type definitions')
    }

    // Suggest ignoredExtensions for common test patterns
    if (!config.ignoredExtensions || config.ignoredExtensions.length === 0) {
      suggestions.push('Consider adding ignoredExtensions: [".test.ts", ".test.tsx", ".spec.ts", ".spec.tsx"]')
    }

    // Suggest excludedFolders for common build directories
    if (!config.excludedFolders || config.excludedFolders.length === 0) {
      suggestions.push('Consider adding excludedFolders: ["node_modules", "dist", "build", "coverage"]')
    }

    return suggestions
  }

  /**
   * Print configuration summary
   */
  printConfigSummary(config: ModuleExportOptions): void {
    logColoredMessage('📋 Configuration Summary:', 'blue')
    logColoredMessage(`  Root Directory: ${config.rootDir}`, 'blue')
    logColoredMessage(`  Output File: ${config.outputFileName}${config.outputFilenameExtension}`, 'blue')
    logColoredMessage(`  Export Mode: ${config.exportMode}`, 'blue')
    logColoredMessage(`  Allowed Extensions: ${config.allowedExtensions?.join(', ') || 'none'}`, 'blue')
    logColoredMessage(`  Ignored Extensions: ${config.ignoredExtensions?.join(', ') || 'none'}`, 'blue')
    logColoredMessage(`  Excluded Folders: ${config.excludedFolders?.join(', ') || 'none'}`, 'blue')

    const suggestions = this.getSuggestions(config)
    if (suggestions.length > 0) {
      logColoredMessage('\n💡 Suggestions:', 'yellow')
      suggestions.forEach(suggestion => {
        logColoredMessage(`  • ${suggestion}`, 'yellow')
      })
    }
  }
}

/**
 * Convenience function to create configuration from preset
 */
export function createConfigFromPreset(
  presetName: PresetName,
  overrides?: Partial<ModuleExportOptions>
): ModuleExportOptions {
  const enhancedConfig = new EnhancedConfig()
  return enhancedConfig.createConfig(presetName, overrides)
}

/**
 * Convenience function to list all presets
 */
export function showAvailablePresets(): void {
  const enhancedConfig = new EnhancedConfig()
  enhancedConfig.listAvailablePresets()
} 