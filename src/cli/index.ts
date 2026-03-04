#!/usr/bin/env node
/**
 * collectexports CLI — Run from terminal with `collectexports` or `ce`.
 *
 * ## Commands
 *
 * - **collect** — Scan directories and generate barrel exports. Use with `-d` or `-r` for root directory.
 * - **init** — Create a `.collect-exports.json` config file. Use `-i` or `--interactive` for guided setup.
 * - **list-presets** — Show available configuration presets (e.g., `library`, `design-system`).
 * - **validate** — Validate your config file without generating exports.
 * - **preset-info &lt;name&gt;** — Show details for a specific preset.
 *
 * ## Examples
 *
 * ```bash
 * collectexports collect -d ./src
 * collectexports collect -d ./src -o index -e .ts,.tsx
 * collectexports init --interactive
 * collectexports list-presets
 * ```
 *
 * @packageDocumentation
 */

import { Command } from 'commander'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import autoExporter from '../features/auto-exporter'
import {
  createConfigFromPreset,
  showAvailablePresets,
  EnhancedConfig
} from '../config/enhanced-config'
import type { PresetName } from '../config/presets'
import type { ModuleExportOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface CLIOptions {
  config?: string
  preset?: string
  rootDir?: string
  directory?: string
  output?: string
  extensions?: string
  ignore?: string
  exclude?: string
  mode?: 'named' | 'default' | 'both'
  debug?: boolean
  verbose?: boolean
  validate?: boolean
  list?: boolean
  init?: boolean
  interactive?: boolean
}

class CollectExportsCLI {
  private program: Command
  private defaultConfigPath = '.collect-exports.json'

  constructor() {
    this.program = new Command()
    this.setupCommands()
  }

  private setupCommands(): void {
    this.program
      .name('collectexports')
      .description(
        'Automatically collect and generate export statements for TypeScript/JavaScript files'
      )
      .version(this.getVersion())

    // Main command (default when no subcommand - barrelsby-style)
    this.program
      .command('collect')
      .option('-c, --config <path>', 'Path to configuration file')
      .option('-p, --preset <name>', 'Use a preset configuration')
      .option(
        '-d, --directory <path>',
        'Root directory to scan (barrelsby-style)'
      )
      .option('-r, --root-dir <path>', 'Root directory to scan')
      .option('-o, --output <name>', 'Output file name (without extension)')
      .option(
        '-e, --extensions <extensions>',
        'Comma-separated list of allowed extensions'
      )
      .option(
        '-i, --ignore <patterns>',
        'Comma-separated list of ignored extensions'
      )
      .option(
        '-x, --exclude <folders>',
        'Comma-separated list of excluded folders'
      )
      .option('-m, --mode <mode>', 'Export mode: named, default, or both')
      .option('-D, --verbose', 'Enable debug/verbose mode')
      .option('--debug', 'Enable debug mode')
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
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
      )
      return packageJson.version
    } catch {
      return '1.0.0'
    }
  }

  private async handleCollect(options: CLIOptions): Promise<void> {
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
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      logColoredMessage(`❌ Error: ${msg}`, 'red')
      process.exit(1)
    }
  }

  private async handleListPresets(): Promise<void> {
    logColoredMessage('📋 Available Configuration Presets:', 'blue')
    showAvailablePresets()
  }

  private async handleInit(options: CLIOptions): Promise<void> {
    try {
      logColoredMessage('🔧 Initializing configuration...', 'blue')

      let config: Record<string, unknown> = {}

      if (options.interactive) {
        const { runInteractiveConfig, writeConfigFile } = await import(
          './interactive-config'
        )
        config = await runInteractiveConfig(process.cwd())
        writeConfigFile(config, this.defaultConfigPath)
        logColoredMessage('💡 You can now run: collectexports collect', 'blue')
        return
      }

      if (options.preset) {
        config = createConfigFromPreset(options.preset as PresetName) as Record<
          string,
          unknown
        >
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
      if (options.extensions)
        config.allowedExtensions = options.extensions.split(',')
      if (options.ignore) config.ignoredExtensions = options.ignore.split(',')
      if (options.exclude) config.excludedFolders = options.exclude.split(',')
      if (options.mode) config.exportMode = options.mode

      // Write configuration file
      const configPath = this.defaultConfigPath
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

      logColoredMessage(`✅ Configuration file created: ${configPath}`, 'green')
      logColoredMessage('💡 You can now run: collectexports collect', 'blue')
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      logColoredMessage(`❌ Error: ${msg}`, 'red')
      process.exit(1)
    }
  }

  private async handleValidate(options: CLIOptions): Promise<void> {
    try {
      const configPath = options.config || this.defaultConfigPath

      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found: ${configPath}`)
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      const enhancedConfig = new EnhancedConfig({
        validate: true,
        autoFix: false
      })

      const isValid = enhancedConfig.validateConfig(config)

      if (isValid) {
        logColoredMessage('✅ Configuration is valid!', 'green')
        enhancedConfig.printConfigSummary(config)
      } else {
        logColoredMessage('❌ Configuration has errors', 'red')
        process.exit(1)
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      logColoredMessage(`❌ Error: ${msg}`, 'red')
      process.exit(1)
    }
  }

  private async handlePresetInfo(presetName: string): Promise<void> {
    try {
      const { CONFIG_PRESETS, isValidPreset } = await import(
        '../config/presets'
      )

      if (!isValidPreset(presetName)) {
        throw new Error(`Preset not found: ${presetName}`)
      }

      const preset = CONFIG_PRESETS[presetName]

      logColoredMessage(`📋 Preset: ${preset.name}`, 'blue')
      logColoredMessage(`Description: ${preset.description}`, 'blue')
      logColoredMessage('\nConfiguration:', 'blue')
      logColoredMessage(JSON.stringify(preset.config, null, 2), 'magenta')
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      logColoredMessage(`❌ Error: ${msg}`, 'red')
      process.exit(1)
    }
  }

  private async loadConfiguration(
    options: CLIOptions
  ): Promise<ModuleExportOptions> {
    let config: Record<string, unknown> = {}

    const { loadConfig } = await import('../utils/config-loader')
    const cwd = process.cwd()

    if (options.config) {
      const loaded = loadConfig({ configPath: options.config, cwd })
      if (loaded) {
        config = loaded as Record<string, unknown>
        logColoredMessage(
          `📋 Loaded configuration from: ${options.config}`,
          'blue'
        )
      }
    } else {
      const loaded = loadConfig({ cwd })
      if (loaded) {
        config = loaded as Record<string, unknown>
        logColoredMessage('📋 Loaded configuration from project', 'blue')
      } else if (fs.existsSync(this.defaultConfigPath)) {
        try {
          config = JSON.parse(fs.readFileSync(this.defaultConfigPath, 'utf8'))
          logColoredMessage(
            `📋 Loaded configuration from: ${this.defaultConfigPath}`,
            'blue'
          )
        } catch (error: unknown) {
          throw new Error(
            `Invalid configuration file: ${(error as Error).message}`
          )
        }
      }
    }

    // Override with CLI options
    if (options.preset) {
      const presetConfig = createConfigFromPreset(
        options.preset as PresetName
      ) as Record<string, unknown>
      config = { ...presetConfig, ...config }
      logColoredMessage(`📋 Using preset: ${options.preset}`, 'blue')
    }

    // CLI options override config file
    if (options.rootDir || options.directory)
      config.rootDir = options.rootDir || options.directory
    if (options.output) config.outputFileName = options.output
    if (options.extensions)
      config.allowedExtensions = options.extensions.split(',')
    if (options.ignore) config.ignoredExtensions = options.ignore.split(',')
    if (options.exclude) config.excludedFolders = options.exclude.split(',')
    if (options.mode) config.exportMode = options.mode
    if (options.debug || options.verbose) config.debug = true

    if (Object.keys(config).length === 0 && !options.preset) {
      config = { rootDir: options.rootDir || options.directory || 'src' }
    }

    // Validate and auto-fix configuration
    const enhancedConfig = new EnhancedConfig({
      validate: true,
      autoFix: true,
      debug: options.debug
    })

    return enhancedConfig.createConfig(config)
  }

  public run(): void {
    this.program.parse(process.argv)
  }
}

// Run CLI
const cli = new CollectExportsCLI()
cli.run()
