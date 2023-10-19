#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { autoExporter } from './auto-exporter';
import { AutoExporterOptions } from './types';


/**
 * Parse command-line arguments and trigger the autoExporter.
 *
 * @param {CommandLineOptions} options - Command-line options.
 */
const startAutoExport = (options: AutoExporterOptions) => {
    autoExporter({
        directory: options.directory,
        defaultExportFile: options.defaultExportFile,
        includeExtensions: options.includeExtensions,
        excludeExtensions: options.excludeExtensions,
    });
};

const argv = yargs(hideBin(process.argv))
    .option('directory', {
        type: 'string',
        description: 'The directory to scan.',
        default: 'src'
    })
    .option('defaultExportFile', {
        type: 'string',
        description: 'Default export file name.',
        default: ''
    })
    .option('includeExtensions', {
        type: 'array',
        string: true,
        description: 'File extensions to include.',
        default: ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts', '.table.ts']
    })
    .option('excludeExtensions', {
        type: 'array',
        string: true,
        description: 'File extensions to exclude.',
        default: ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts', '.styles.tsx', '.styles.ts', '.keys.ts']
    })
    .help()
    .argv;

startAutoExport(argv as AutoExporterOptions);
