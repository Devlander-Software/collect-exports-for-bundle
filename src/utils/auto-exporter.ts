import * as fs from 'fs'
import * as path from 'path'
import { ModuleExportOptions } from '../types/types'
import { colorLog } from './color-log'
import { generateExportsFromDir } from './generate-exports-from-dir' // Assuming you named the file containing the new function like this
import { simulateProgressBar } from './stimulate-progress-bar'

const checkForCommandLineFlags = (
  config: ModuleExportOptions
): ModuleExportOptions => {
  function handleCommandLineArgs(): void {
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
        // Add case for excludeFolders and files if you want to handle them via command line
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
  }

  colorLog('Starting auto-exporter script', 'blue')

  colorLog(`Current Configuration: ${JSON.stringify(config, null, 2)}`, 'blue')

  handleCommandLineArgs()

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

export const autoExporter = (options: ModuleExportOptions = {}): void => {
  const config: ModuleExportOptions = {
    ...options,
    rootDir: options.rootDir || 'src',
    primaryExportFile: options.primaryExportFile || '',
    allowedExtensions: options.allowedExtensions || ['.ts', '.tsx'],
    ignoredExtensions: options.ignoredExtensions || ['.test.tsx', '.test.ts'],
    excludedFolders: options.excludedFolders || [],
    specificFiles: options.specificFiles || [],
    outputFilenameExtension: options.outputFilenameExtension || '.ts'
  }

  const fileNameToWriteTo = `index${config.outputFilenameExtension}`

  if (config && config.primaryExportFile && config.primaryExportFile !== '') {
    // default export file should never be index
    // all of the files in the directory will be exported in index.ts
    if (config.primaryExportFile.includes('index')) {
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
  checkForCommandLineFlags(config)

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
  const exportsList = generateExportsFromDir(config.rootDir, config)

  simulateProgressBar(
    `Writing to ${fileNameToWriteTo}...`,
    TOTAL_STEPS,
    currentStep++
  )
  fs.writeFileSync(
    path.join(config.rootDir, fileNameToWriteTo),
    exportsList.join('\n')
  )

  console.log(colorLog(`\nExports generated in ${fileNameToWriteTo}\n`, 'blue'))
}

export default autoExporter
