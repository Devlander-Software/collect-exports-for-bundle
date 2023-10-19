#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const auto_exporter_1 = require("./auto-exporter");
/**
 * Parse command-line arguments and trigger the autoExporter.
 *
 * @param {CommandLineOptions} options - Command-line options.
 */
const startAutoExport = (options) => {
    (0, auto_exporter_1.autoExporter)({
        directory: options.directory,
        defaultExportFile: options.defaultExportFile,
        includeExtensions: options.includeExtensions,
        excludeExtensions: options.excludeExtensions,
    });
};
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
startAutoExport(argv);
//# sourceMappingURL=cli.js.map