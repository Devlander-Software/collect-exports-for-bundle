import * as fs from 'fs'
import * as path from 'path'
import { isCamelCase } from '../constraints/is-camel-case'
import { generateExportsFromDir } from '../export-related/generate-exports-from-dir'
import { generateExports, formatExportOutput } from '../export-related/export-generator'
import { ModuleExportOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'
import { modifyConfig } from '../utils/modify-config'
import { simulateProgressBar } from '../utils/stimulate-progress-bar'
import { bundleExportAsFunction } from './bundle-export-as-function-old'

/**
 * Main auto-exporter function that generates comprehensive export files for TypeScript/JavaScript projects.
 * 
 * This function is the core entry point for the library, providing intelligent export generation
 * with support for multiple export strategies, platform-specific handling, and extensive configuration options.
 * 
 * ## Features
 * 
 * - **Automatic Export Detection**: Scans directories and identifies exportable content
 * - **Multiple Export Strategies**: Supports standard exports, bundled objects, and primary file exports
 * - **Platform Awareness**: Handles web, native, and universal modules intelligently
 * - **Progress Tracking**: Visual feedback during processing with progress bars
 * - **Debug Mode**: Comprehensive logging for troubleshooting and development
 * - **Flexible Configuration**: Extensive options for customization and optimization
 * 
 * ## Export Strategies
 * 
 * 1. **Standard**: Generates individual named exports for each file
 * 2. **Bundle Object**: Creates a single default export containing all exports as properties
 * 3. **Primary File**: Uses a designated primary file as the main export source
 * 
 * @param options - Configuration options for export generation
 * @param options.rootDir - Root directory to scan for exports (required)
 * @param options.outputFileName - Name of the output file (without extension)
 * @param options.outputFilenameExtension - File extension for the output file
 * @param options.extensions - File extensions to include in scanning
 * @param options.bundleAsObjectForDefaultExport - Name for bundled object export
 * @param options.primaryExportFile - Path to primary export file
 * @param options.specificFiles - Array of specific files to process
 * @param options.debug - Enable debug logging
 * @param options.includeSubdirectories - Whether to include subdirectories in scanning
 * 
 * @returns Promise that resolves when export generation is complete
 * 
 * @throws {Error} When required configuration is missing or invalid
 * 
 * @example
 * ```typescript
 * // Basic usage with directory scanning
 * await autoExporter({
 *   rootDir: './src/components',
 *   outputFileName: 'index',
 *   outputFilenameExtension: '.ts',
 *   extensions: ['.ts', '.tsx'],
 *   includeSubdirectories: true
 * });
 * 
 * // Bundle all exports into a single object
 * await autoExporter({
 *   rootDir: './src/utils',
 *   outputFileName: 'utils',
 *   outputFilenameExtension: '.ts',
 *   bundleAsObjectForDefaultExport: 'utils',
 *   extensions: ['.ts']
 * });
 * 
 * // Process specific files only
 * await autoExporter({
 *   rootDir: './src',
 *   outputFileName: 'exports',
 *   outputFilenameExtension: '.ts',
 *   specificFiles: ['component1.ts', 'component2.ts'],
 *   extensions: ['.ts']
 * });
 * ```
 * 
 * @since 2.0.0
 * @category Core
 */

const autoExporter = async (
  options: ModuleExportOptions = {}
): Promise<void> => {
  try {
    const config = await modifyConfig(options)

    const fileNameToWriteTo = `${config.outputFileName}${config.outputFilenameExtension}`

    // Validate bundle name if provided
    if (
      config.bundleAsObjectForDefaultExport &&
      config.bundleAsObjectForDefaultExport !== ''
    ) {
      isCamelCase(config.bundleAsObjectForDefaultExport)
    }

    const TOTAL_STEPS = 4
    let currentStep = 1

    simulateProgressBar(
      'Processing configuration...',
      TOTAL_STEPS,
      currentStep++
    )

    simulateProgressBar(
      'Validating export strategy...',
      TOTAL_STEPS,
      currentStep++
    )
    
    if (!config.rootDir || config.rootDir === '') {
      throw new Error('Directory is required')
    }

    // Determine export strategy and log it
    let exportStrategy = 'Standard'
    if (config.bundleAsObjectForDefaultExport) {
      exportStrategy = 'Bundle Object'
    } else if (config.primaryExportFile) {
      exportStrategy = 'Primary File'
    }

    if (config.debug) {
      logColoredMessage(`\nExport Strategy: ${exportStrategy}`, 'blue')
      if (config.bundleAsObjectForDefaultExport) {
        logColoredMessage(`Bundle Name: ${config.bundleAsObjectForDefaultExport}`, 'blue')
      }
      if (config.primaryExportFile) {
        logColoredMessage(`Primary File: ${config.primaryExportFile}`, 'blue')
      }
    }

    simulateProgressBar(
      'Generating exports...',
      TOTAL_STEPS,
      currentStep++
    )

    // Generate exports using the new clean system
    let files: string[] = []
    
    if (config.specificFiles && config.specificFiles.length > 0) {
      // Use specific files
      files = config.specificFiles.map(file => 
        path.join(config.rootDir, file)
      )
    } else {
      // Scan directory for exports (this will need to be updated to return file paths)
      const exportsList = await generateExportsFromDir(config.rootDir, config)
      // For now, we'll use the existing system for directory scanning
      // TODO: Update generateExportsFromDir to return file paths
      files = [config.rootDir] // Placeholder
    }

    // Generate exports using the new system
    const exportOutput = generateExports(files, config)
    const formattedExports = formatExportOutput(exportOutput)
    
    // Split into lines for writing
    const exportsList = formattedExports.split('\n')

    if (config.debug) {
      console.log('Generated export output:', exportOutput)
      console.log('Formatted exports:', formattedExports)
    }

    simulateProgressBar(
      `Writing to ${fileNameToWriteTo}...`,
      TOTAL_STEPS,
      currentStep++
    )

    // Write the exports to file
    fs.writeFileSync(
      path.join(config.rootDir, fileNameToWriteTo),
      exportsList.join('\n')
    )

    // Handle bundle export as function if requested
    if (
      config.bundleAsObjectForDefaultExport &&
      config.rootDir &&
      typeof config.bundleAsObjectForDefaultExport !== 'undefined'
    ) {
      if (config.debug) {
        logColoredMessage(
          `\nBundling all modules from ${fileNameToWriteTo} as into one object as a module\n`,
          'blue'
        )
      }
      
      await bundleExportAsFunction({
        ...config
      })
    } else {
      if (config.debug) {
        logColoredMessage(
          `\nExporting all functions from ${fileNameToWriteTo} as separate modules\n`,
          'blue'
        )
      }
    }

    if (config.debug) {
      logColoredMessage(
        `\n${JSON.stringify(config.results, null, 2)}`,
        'yellow'
      )
    }
    
    logColoredMessage(`\nExports generated in ${fileNameToWriteTo}\n`, 'green')
    logColoredMessage(`Located at ${config.rootDir}\n`, 'green')
    
    // Log export strategy and mode information
    logColoredMessage(`\nExport Strategy: ${exportStrategy}`, 'blue')
    logColoredMessage(`Export Mode: ${config.exportMode}`, 'blue')
    
    if (exportOutput.bundleObject) {
      logColoredMessage('Bundle Object: Generated', 'green')
    }
    if (exportOutput.defaultExport) {
      logColoredMessage('Default Export: Generated', 'green')
    }
    if (exportOutput.exports.length > 0) {
      logColoredMessage(`Named Exports: ${exportOutput.exports.length} generated`, 'green')
    }
    
  } catch (e) {
    console.log(e)
    logColoredMessage(`\nError: ${e}\n`, 'red')
  }
}

export default autoExporter
