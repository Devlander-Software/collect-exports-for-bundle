#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { ModuleExportOptions, ParsedArgs } from '../types/types'
import { autoExporter } from '../utils/auto-exporter'
const inquirer = require('inquirer')
export const promptForConfiguration =
  async (): Promise<ModuleExportOptions> => {
    const questions = [
      {
        type: 'input',
        name: 'directory',
        message: 'Enter the directory to scan:',
        default: 'src'
      },
      {
        type: 'input',
        name: 'defaultExportFile',
        message: 'Enter the default export file name (leave empty if none):',
        default: ''
      },
      {
        type: 'input',
        name: 'includeExtensions',
        message: 'Enter the file extensions to include (comma separated):',
        default: '.ts,.tsx'
      },
      {
        type: 'input',
        name: 'excludeExtensions',
        message: 'Enter the file extensions to exclude (comma separated):',
        default: '.test.tsx,.test.ts'
      },
      {
        type: 'input',
        name: 'excludeFolders',
        message: 'Enter folder names to exclude (comma separated):',
        default: ''
      },
      {
        type: 'input',
        name: 'files',
        message: 'Enter specific file paths to include (comma separated):',
        default: ''
      }
    ]

    const answers = await inquirer.prompt(questions)

    // Convert comma-separated answers to arrays
    answers.includeExtensions = answers.includeExtensions.split(',')
    answers.excludeExtensions = answers.excludeExtensions.split(',')
    answers.excludeFolders = answers.excludeFolders.split(',')
    answers.files = answers.files.split(',')

    return answers
  }

export const runCLI = async () => {
  const argv = yargs(hideBin(process.argv))
    .option('directory', {
      type: 'string',
      description: 'The directory to scan.'
    })
    .option('defaultExportFile', {
      type: 'string',
      description: 'Default export file name.',
      default: ''
    })
    .option('includeExtensions', {
      type: 'array',
      string: true,
      description: 'File extensions to include.'
    })
    .option('excludeExtensions', {
      type: 'array',
      string: true,
      description: 'File extensions to exclude.'
    })
    .option('excludeFolders', {
      type: 'array',
      string: true,
      description: 'Folder names to exclude.'
    })
    .option('files', {
      type: 'array',
      string: true,
      description: 'Specific file paths to include.'
    })
    .help().argv as ParsedArgs

  let config: ModuleExportOptions = {
    rootDir: argv.directory || 'src',
    primaryExportFile: argv.defaultExportFile || '',
    allowedExtensions: argv.includeExtensions || ['.ts', '.tsx'],
    ignoredExtensions: argv.excludeExtensions || ['.test.tsx', '.test.ts'],
    excludedFolders: argv.excludeFolders || [],
    specificFiles: argv.files || []
  }

  // If no arguments provided, fallback to interactive mode
  if (Object.keys(argv).length <= 2) {
    // yargs always has $0 and _ keys
    config = await promptForConfiguration()
  }

  autoExporter(config)
}
