#!/usr/bin/env node

import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { autoExporter } from './auto-exporter';
import { AutoExporterOptions, ParsedArgs } from './types';

const promptForConfiguration = async (): Promise<AutoExporterOptions> => {
    const questions = [
        {
            type: 'input',
            name: 'directory',
            message: 'Enter the directory to scan:',
            default: 'src',
        },
        {
            type: 'input',
            name: 'defaultExportFile',
            message: 'Enter the default export file name (leave empty if none):',
            default: '',
        },
        {
            type: 'input',
            name: 'includeExtensions',
            message: 'Enter the file extensions to include (comma separated):',
            default: '.ts,.tsx',
        },
        {
            type: 'input',
            name: 'excludeExtensions',
            message: 'Enter the file extensions to exclude (comma separated):',
            default: '.test.tsx,.test.ts',
        },
        {
            type: 'input',
            name: 'excludeFolders',
            message: 'Enter folder names to exclude (comma separated):',
            default: '',
        },
        {
            type: 'input',
            name: 'files',
            message: 'Enter specific file paths to include (comma separated):',
            default: '',
        },
    ];

    const answers = await inquirer.prompt(questions);
    
    // Convert comma-separated answers to arrays
    answers.includeExtensions = answers.includeExtensions.split(',');
    answers.excludeExtensions = answers.excludeExtensions.split(',');
    answers.excludeFolders = answers.excludeFolders.split(',');
    answers.files = answers.files.split(',');

    return answers;
};

const runCLI = async () => {
    const argv = yargs(hideBin(process.argv))
        .option('directory', { type: 'string', description: 'The directory to scan.' })
        .option('defaultExportFile', { type: 'string', description: 'Default export file name.', default: '' })
        .option('includeExtensions', { type: 'array', string: true, description: 'File extensions to include.' })
        .option('excludeExtensions', { type: 'array', string: true, description: 'File extensions to exclude.' })
        .option('excludeFolders', { type: 'array', string: true, description: 'Folder names to exclude.' })
        .option('files', { type: 'array', string: true, description: 'Specific file paths to include.' })
        .help()
        .argv as ParsedArgs;

        let config: AutoExporterOptions = {
            directory: argv.directory || 'src',
            defaultExportFile: argv.defaultExportFile || '',
            includeExtensions: argv.includeExtensions || ['.ts', '.tsx'],
            excludeExtensions: argv.excludeExtensions || ['.test.tsx', '.test.ts'],
            excludeFolders: argv.excludeFolders || [],
            files: argv.files || [],
        };

    // If no arguments provided, fallback to interactive mode
    if (Object.keys(argv).length <= 2) { // yargs always has $0 and _ keys
        config = await promptForConfiguration();
    }

    autoExporter(config);
};

runCLI();
