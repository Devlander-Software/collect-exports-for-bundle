import * as fs from 'fs'
import * as path from 'path'
import { isCamelCase } from '../constraints/is-camel-case'
import { generateExportsFromDir } from '../export-related/generate-exports-from-dir'
import { ModuleExportOptions } from '../types/module-exporter.types'
import { logColoredMessage } from '../utils/log-with-color'
import { modifyConfig } from '../utils/modify-config'
import { simulateProgressBar } from '../utils/stimulate-progress-bar'
import { bundleExportAsFunction } from './bundle-export-as-function'

/**
 * Scans a directory and generates barrel export statements (e.g., `index.ts`) automatically.
 *
 * Use this when you want to programmatically generate exports from scripts, build tools,
 * or CI pipelines.
 *
 * @param options - Configuration for which directory to scan, extensions to include/exclude,
 *                  output filename, and export mode. See {@link ModuleExportOptions}.
 * @returns Promise that resolves when barrel files have been written.
 * @throws Throws if `rootDir` is missing or invalid.
 *
 * @example
 * Basic usage with defaults:
 * ```typescript
 * import autoExporter from 'collectexports'
 *
 * await autoExporter({
 *   rootDir: 'src/components',
 *   allowedExtensions: ['.ts', '.tsx'],
 *   ignoredExtensions: ['.test.ts', '.stories.tsx'],
 * })
 * ```
 *
 * @example
 * With TypeScript API for accurate export extraction:
 * ```typescript
 * await autoExporter({
 *   rootDir: 'src',
 *   allowedExtensions: ['.ts', '.tsx'],
 *   useTypeScriptAPI: true,
 *   barrelMode: 'perDirectory',
 * })
 * ```
 */
const autoExporter = async (
  options: ModuleExportOptions = {}
): Promise<void> => {
  try {
    const config = await modifyConfig(options)

    const fileNameToWriteTo = `${config.outputFileName}${config.outputFilenameExtension}`

    if (
      config.bundleAsObjectForDefaultExport &&
      config.bundleAsObjectForDefaultExport !== ''
    ) {
      isCamelCase(config.bundleAsObjectForDefaultExport)
    }

    if (
      config &&
      config.primaryExportFile &&
      config.primaryExportFile !== '' &&
      typeof config.bundleAsObjectForDefaultExport !== 'undefined'
    ) {
      // default export file should never be index
      // all of the specificFiles in the directory will be exported in index.ts
      if (
        config.outputFileName &&
        config.primaryExportFile.includes(config.outputFileName)
      ) {
        config.primaryExportFile = config.primaryExportFile = ''
      }
    }

    const TOTAL_STEPS = 4 // Number of steps in your progress
    let currentStep = 1 // Starting step

    simulateProgressBar(
      'Processing command-line flags...',
      TOTAL_STEPS,
      currentStep++
    )

    simulateProgressBar(
      'Checking default export file...',
      TOTAL_STEPS,
      currentStep++
    )
    if (!config.rootDir || config.rootDir === '') {
      throw new Error('Directory is required')
    }

    if (config.specificFiles && config.specificFiles.length > 0) {
      if (!config.primaryExportFile || config.primaryExportFile !== '') {
        if (
          config.primaryExportFile &&
          fs.existsSync(path.join(config.rootDir, config.primaryExportFile))
        ) {
          if (!config.specificFiles.includes(config.primaryExportFile)) {
            config.specificFiles.push(config.primaryExportFile)
          }
        }
      }
    }

    simulateProgressBar(
      'Generating exports from directory...',
      TOTAL_STEPS,
      currentStep++
    )

    const barrelResults = await generateExportsFromDir(config.rootDir, config)

    if (config.debug) {
      logColoredMessage(
        `Generated barrels: ${JSON.stringify(
          barrelResults.map((r) => r.outputPath),
          null,
          2
        )}`,
        'magenta'
      )
    }

    simulateProgressBar(
      `Writing to ${fileNameToWriteTo}...`,
      TOTAL_STEPS,
      currentStep++
    )

    for (const { outputPath, content } of barrelResults) {
      fs.writeFileSync(outputPath, content.join('\n'))
      if (config.debug) {
        logColoredMessage(`Wrote ${outputPath}`, 'green')
      }
    }

    if (
      config.barrelMode !== 'perDirectory' &&
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
      // TO DO
      // after this function runs
      // it should have updated the resuls object in the config
      // which would have updated values for includedExports, excludedExports,
      // includedFolders, excludedFolders, includedFiles, excludedFiles
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
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    logColoredMessage(`\nError: ${errorMessage}\n`, 'red')
    if (process.env.DEBUG) {
      logColoredMessage(e instanceof Error ? e.stack ?? '' : String(e), 'red')
    }
  }
}

export default autoExporter
