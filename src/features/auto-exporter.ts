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
