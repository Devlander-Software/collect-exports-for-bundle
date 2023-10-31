import * as fs from 'fs'
import * as path from 'path'
import { ModuleExportOptions } from '../types/types'
import { bundleExportAsFunction } from './bundle-export-as-function'
import { generateExportsFromDir } from './generate-exports-from-dir'
import { isCamelCase } from './is-camel-case'
import { logColoredMessage } from './log-with-color'
import { simulateProgressBar } from './stimulate-progress-bar'

const defaultAutoExportConfig: ModuleExportOptions = {
  rootDir: 'src',
  primaryExportFile: '',
  allowedExtensions: ['.ts', '.tsx'],
  ignoredExtensions: [
    '.test.tsx',
    '.test.ts',
    '.stories.tsx',
    '.stories.ts',
    '.stories.tsx'
  ],
  excludedFolders: [],
  specificFiles: [],
  outputFilenameExtension: '.ts',
  outputFileName: 'index',
  bundleAsFunctionForDefaultExportAs: undefined
}

export const autoExporter = async (
  options: ModuleExportOptions = {}
): Promise<void> => {
  try {
    const config: ModuleExportOptions = {
      ...options,
      rootDir: options.rootDir || defaultAutoExportConfig.rootDir,
      primaryExportFile:
        options.primaryExportFile || defaultAutoExportConfig.primaryExportFile,
      allowedExtensions:
        options.allowedExtensions || defaultAutoExportConfig.allowedExtensions,
      ignoredExtensions:
        options.ignoredExtensions || defaultAutoExportConfig.ignoredExtensions,
      excludedFolders:
        options.excludedFolders || defaultAutoExportConfig.excludedFolders,
      specificFiles:
        options.specificFiles || defaultAutoExportConfig.specificFiles,
      outputFileName:
        options.outputFileName || defaultAutoExportConfig.outputFileName,
      outputFilenameExtension:
        options.outputFilenameExtension ||
        defaultAutoExportConfig.outputFilenameExtension,
      bundleAsFunctionForDefaultExportAs:
        options.bundleAsFunctionForDefaultExportAs ||
        defaultAutoExportConfig.bundleAsFunctionForDefaultExportAs
    }

    const fileNameToWriteTo = `${config.outputFileName}${config.outputFilenameExtension}`

    if (
      config.bundleAsFunctionForDefaultExportAs &&
      config.bundleAsFunctionForDefaultExportAs !== ''
    ) {
      isCamelCase(config.bundleAsFunctionForDefaultExportAs)
    }

    if (
      config &&
      config.primaryExportFile &&
      config.primaryExportFile !== '' &&
      typeof config.bundleAsFunctionForDefaultExportAs !== 'undefined'
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
    const exportsList = await generateExportsFromDir(config.rootDir, config)

    simulateProgressBar(
      `Writing to ${fileNameToWriteTo}...`,
      TOTAL_STEPS,
      currentStep++
    )

    fs.writeFileSync(
      path.join(config.rootDir, fileNameToWriteTo),
      exportsList.join('\n')
    )

    if (config.bundleAsFunctionForDefaultExportAs && config.rootDir) {
      logColoredMessage(
        `\nBundling all modules from ${fileNameToWriteTo} as into one object as a module\n`,
        'blue'
      )

      await bundleExportAsFunction({
        rootDir: config.rootDir,
        outputFileName: config.outputFileName,
        outputFilenameExtension: config.outputFilenameExtension,
        bundleAsFunctionForDefaultExportAs:
          config.bundleAsFunctionForDefaultExportAs,
        ...config
      })
    } else {
      logColoredMessage(
        `\nExporting all functions from ${fileNameToWriteTo} as separate modules\n`,
        'blue'
      )
    }

    logColoredMessage(`\nExports generated in ${fileNameToWriteTo}\n`, 'green')
  } catch (e) {
    console.log(e)
    logColoredMessage(`\nError: ${e}\n`, 'red')
  }
}

export default autoExporter
