#!/usr/bin/env node

import { Command } from 'commander'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import autoExporter, { 
  createConfigFromPreset, 
  showAvailablePresets,
  EnhancedConfig 
} from '../features/auto-exporter'
import { logColoredMessage } from '../utils/helpers/color-logger'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface CLIOptions {
  config?: string
  preset?: string
  rootDir?: string
  output?: string
  extensions?: string
  ignore?: string
  exclude?: string
  mode?: 'named' | 'default' | 'both'
  debug?: boolean
  validate?: boolean
  list?: boolean
  init?: boolean
}

class CollectExportsCLI {
  private program: Command
  private defaultConfigPath = '.collect-exports.json'

  constructor() {
    this.program = new Command()
    this.setupCommands()
  }

  private setupCommands() {
    this.program
      .name('collect-exports')
      .description('Automatically collect and generate export statements for TypeScript/JavaScript files')
      .version(this.getVersion())

    // Main command
    this.program
      .command('collect')
      .description('Collect exports from files')
      .option('-c, --config <path>', 'Path to configuration file')
      .option('-p, --preset <name>', 'Use a preset configuration')
      .option('-r, --root-dir <path>', 'Root directory to scan')
      .option('-o, --output <name>', 'Output file name (without extension)')
      .option('-e, --extensions <extensions>', 'Comma-separated list of allowed extensions')
      .option('-i, --ignore <patterns>', 'Comma-separated list of ignored extensions')
      .option('-x, --exclude <folders>', 'Comma-separated list of excluded folders')
      .option('-m, --mode <mode>', 'Export mode: named, default, or both')
      .option('-d, --debug', 'Enable debug mode')
      .option('-v, --validate', 'Validate configuration only')
      .action(this.handleCollect.bind(this))

    // List presets
    this.program
      .command('list-presets')
      .description('List available configuration presets')
      .action(this.handleListPresets.bind(this))

    // Initialize config
    this.program
      .command('init')
      .description('Initialize a configuration file')
      .option('-p, --preset <name>', 'Use a preset as base')
      .option('-i, --interactive', 'Interactive configuration setup')
      .action(this.handleInit.bind(this))

    // Validate config
    this.program
      .command('validate')
      .description('Validate configuration file')
      .option('-c, --config <path>', 'Path to configuration file')
      .action(this.handleValidate.bind(this))

    // Show help for presets
    this.program
      .command('preset-info <name>')
      .description('Show information about a specific preset')
      .action(this.handlePresetInfo.bind(this))
  }

  private getVersion(): string {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'))
      return packageJson.version
    } catch {
      return '1.0.0'
    }
  }

  private async handleCollect(options: CLIOptions) {
    try {
      logColoredMessage('🚀 Collect Exports CLI', 'blue')
      logColoredMessage('Starting export collection...', 'blue')

      // Load configuration
      const config = await this.loadConfiguration(options)

      if (options.validate) {
        logColoredMessage('✅ Configuration is valid!', 'green')
        return
      }

      // Run the export collection
      await autoExporter(config)
      
      logColoredMessage('✅ Export collection completed successfully!', 'green')
    } catch (error) {
      logColoredMessage(`❌ Error: ${error.message}`, 'red')
      process.exit(1)
    }
  }

  private async handleListPresets() {
    logColoredMessage('📋 Available Configuration Presets:', 'blue')
    showAvailablePresets()
  }

  private async handleInit(options: CLIOptions) {
    try {
      logColoredMessage('🔧 Initializing configuration...', 'blue')

      let config: any = {}

      if (options.preset) {
        config = createConfigFromPreset(options.preset as any)
        logColoredMessage(`📋 Using preset: ${options.preset}`, 'green')
      } else {
        // Default configuration
        config = {
          rootDir: 'src',
          allowedExtensions: ['.ts', '.tsx'],
          ignoredExtensions: ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx'],
          excludedFolders: ['node_modules', 'dist', 'build'],
          outputFileName: 'index',
          outputFilenameExtension: '.ts',
          exportMode: 'named',
          includeIndexes: false
        }
      }

      // Customize based on CLI options
      if (options.rootDir) config.rootDir = options.rootDir
      if (options.output) config.outputFileName = options.output
      if (options.extensions) config.allowedExtensions = options.extensions.split(',')
      if (options.ignore) config.ignoredExtensions = options.ignore.split(',')
      if (options.exclude) config.excludedFolders = options.exclude.split(',')
      if (options.mode) config.exportMode = options.mode

      // Write configuration file
      const configPath = this.defaultConfigPath
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

      logColoredMessage(`✅ Configuration file created: ${configPath}`, 'green')
      logColoredMessage('💡 You can now run: collect-exports collect', 'blue')
    } catch (error) {
      logColoredMessage(`❌ Error: ${error.message}`, 'red')
      process.exit(1)
    }
  }

  private async handleValidate(options: CLIOptions) {
    try {
      const configPath = options.config || this.defaultConfigPath
      
      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found: ${configPath}`)
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      const enhancedConfig = new EnhancedConfig({ validate: true, autoFix: false })
      
      const isValid = enhancedConfig.validateConfig(config)
      
      if (isValid) {
        logColoredMessage('✅ Configuration is valid!', 'green')
        enhancedConfig.printConfigSummary(config)
      } else {
        logColoredMessage('❌ Configuration has errors', 'red')
        process.exit(1)
      }
    } catch (error) {
      logColoredMessage(`❌ Error: ${error.message}`, 'red')
      process.exit(1)
    }
  }

  private async handlePresetInfo(presetName: string) {
    try {
      const { CONFIG_PRESETS } = await import('../config/presets')
      
      if (!CONFIG_PRESETS[presetName]) {
        throw new Error(`Preset not found: ${presetName}`)
      }

      const preset = CONFIG_PRESETS[presetName]
      
      logColoredMessage(`📋 Preset: ${preset.name}`, 'blue')
      logColoredMessage(`Description: ${preset.description}`, 'cyan')
      logColoredMessage('\nConfiguration:', 'blue')
      logColoredMessage(JSON.stringify(preset.config, null, 2), 'gray')
    } catch (error) {
      logColoredMessage(`❌ Error: ${error.message}`, 'red')
      process.exit(1)
    }
  }

  private async loadConfiguration(options: CLIOptions) {
    let config: any = {}

    // Try to load from config file
    const configPath = options.config || this.defaultConfigPath
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        logColoredMessage(`📋 Loaded configuration from: ${configPath}`, 'blue')
      } catch (error) {
        throw new Error(`Invalid configuration file: ${error.message}`)
      }
    }

    // Override with CLI options
    if (options.preset) {
      const presetConfig = createConfigFromPreset(options.preset as any)
      config = { ...presetConfig, ...config }
      logColoredMessage(`📋 Using preset: ${options.preset}`, 'blue')
    }

    // CLI options override config file
    if (options.rootDir) config.rootDir = options.rootDir
    if (options.output) config.outputFileName = options.output
    if (options.extensions) config.allowedExtensions = options.extensions.split(',')
    if (options.ignore) config.ignoredExtensions = options.ignore.split(',')
    if (options.exclude) config.excludedFolders = options.exclude.split(',')
    if (options.mode) config.exportMode = options.mode
    if (options.debug) config.debug = true

    // Validate and auto-fix configuration
    const enhancedConfig = new EnhancedConfig({
      validate: true,
      autoFix: true,
      debug: options.debug
    })

    return enhancedConfig.createConfig(config)
  }

  public run() {
    this.program.parse()
  }
}

// Run CLI
const cli = new CollectExportsCLI()
cli.run() 