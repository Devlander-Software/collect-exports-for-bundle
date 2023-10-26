import * as fs from 'fs'
import * as path from 'path'
import { ModuleExportOptions } from '../types/types'
import { generateExportsFromDir } from './generate-exports-from-dir'
import { logColoredMessage as colorLog } from './log-with-color'
import { simulateProgressBar } from './stimulate-progress-bar'

const checkForCommandLineFlags = (
  config: ModuleExportOptions
): ModuleExportOptions => {
  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-d':
      case '--directory':
        config.rootDir = args[i + 1]
        i++
        break
      case '-de':
      case '--default-export':
        config.primaryExportFile = args[i + 1]
        i++
        break
      case '-ie':
      case '--include-extensions':
        config.allowedExtensions = args[i + 1].split(',')
        i++
        break
      case '-ee':
      case '--exclude-extensions':
        config.ignoredExtensions = args[i + 1].split(',')
        i++
        break
      // Additional cases for other flags can go here
    }
  }

  colorLog(
    `Updated Configuration after processing command-line args: ${JSON.stringify(
      config,
      null,
      2
    )}`,
    'blue'
  )

  return config
}

export const createTestFolderAndFiles = (
  folderPath: string,
  files: string[]
): void => {
  fs.mkdirSync(folderPath, { recursive: true })
  for (const file of files) {
    fs.writeFileSync(path.join(folderPath, file), '')
  }
}

export const defaultConfig: ModuleExportOptions = {
  rootDir: 'src',
  primaryExportFile: '',
  allowedExtensions: ['.ts', '.tsx', '.component.tsx', '.enum.ts', '.dto.ts'],
  ignoredExtensions: ['.test.tsx', '.test.ts'],
  excludedFolders: [],
  specificFiles: [],
  outputFilenameExtension: '.ts'
}

export const autoExporter = (options: ModuleExportOptions = {}): void => {
  const config: ModuleExportOptions = {
    rootDir: options.rootDir || defaultConfig.rootDir,
    primaryExportFile:
      options.primaryExportFile || defaultConfig.primaryExportFile,
    allowedExtensions:
      options.allowedExtensions || defaultConfig.allowedExtensions,
    ignoredExtensions:
      options.ignoredExtensions || defaultConfig.ignoredExtensions,
    excludedFolders: options.excludedFolders || defaultConfig.excludedFolders,
    specificFiles: options.specificFiles || defaultConfig.specificFiles,
    outputFilenameExtension:
      options.outputFilenameExtension || defaultConfig.outputFilenameExtension
  }

  const fileNameToWriteTo = `index${config.outputFilenameExtension}`

  if (config.primaryExportFile && config.primaryExportFile.includes('index')) {
    config.primaryExportFile = ''
  }

  colorLog(`Writing to ${fileNameToWriteTo}...`, 'blue')

  const TOTAL_STEPS = 4
  let currentStep = 1

  simulateProgressBar(
    'Processing command-line flags...',
    TOTAL_STEPS,
    currentStep++
  )
  checkForCommandLineFlags(config)

  simulateProgressBar(
    'Checking default export file...',
    TOTAL_STEPS,
    currentStep++
  )

  if (!config.rootDir || config.rootDir.trim() === '') {
    throw new Error('Directory is required')
  }

  if (
    config.primaryExportFile &&
    fs.existsSync(path.join(config.rootDir, config.primaryExportFile))
  ) {
    if (
      config &&
      config.specificFiles &&
      !config.specificFiles.includes(config.primaryExportFile)
    ) {
      config.specificFiles.push(config.primaryExportFile)
    }
  }

  simulateProgressBar(
    'Generating exports from directory...',
    TOTAL_STEPS,
    currentStep++
  )
  const exportsList = generateExportsFromDir(config.rootDir, config)
  exportsList.push(
    `// Auto-generated exports from ${fileNameToWriteTo} file at ${new Date().toLocaleString()}`
  )

  simulateProgressBar(
    `Writing to ${fileNameToWriteTo}...`,
    TOTAL_STEPS,
    currentStep++
  )
  fs.writeFileSync(
    path.join(config.rootDir, fileNameToWriteTo),
    exportsList.join('\n')
  )

  colorLog(`\nExports generated in ${fileNameToWriteTo}\n`, 'blue')
}

export default autoExporter
