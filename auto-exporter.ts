import * as fs from 'fs';
import * as path from 'path';
import * as pc from 'picocolors';
import { generateExportsFromDir } from './generate-exports-from-dir'; // Assuming you named the file containing the new function like this
import { AutoExporterOptions } from './types';


const checkForCommandLineFlags = (config: AutoExporterOptions): AutoExporterOptions => {
    function handleCommandLineArgs(): void {
        const args = process.argv.slice(2);
        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case '-d':
                case '--directory':
                    config.directory = args[i + 1];
                    i++;
                    break;
                case '-de':
                case '--default-export':
                    config.defaultExportFile = args[i + 1];
                    i++;
                    break;
                case '-ie':
                case '--include-extensions':
                    config.includeExtensions = args[i + 1].split(',');
                    i++;
                    break;
                case '-ee':
                case '--exclude-extensions':
                    config.excludeExtensions = args[i + 1].split(',');
                    i++;
                    break;
                // Add case for excludeFolders and files if you want to handle them via command line
            }
        }
        console.log(pc.cyan("Updated Configuration after processing command-line args:"), JSON.stringify(config, null, 2));
    }

    console.log("Starting auto-exporter script");
    console.log(pc.cyan("Current Configuration:"), JSON.stringify(config, null, 2));

    handleCommandLineArgs();


    return config;
}

export const createTestFolderAndFiles = (folderPath: string, files: string[]): void => {
    fs.mkdirSync(folderPath, { recursive: true });
    for (const file of files) {
        fs.writeFileSync(path.join(folderPath, file), '');
    }
}




export const autoExporter = (options: AutoExporterOptions = {}): void => {
    const config: AutoExporterOptions = {
        ...options,
        directory: options.directory || 'src',
        defaultExportFile: options.defaultExportFile || '',
        includeExtensions: options.includeExtensions || ['.ts', '.tsx'],
        excludeExtensions: options.excludeExtensions || ['.test.tsx', '.test.ts'],
        excludeFolders: options.excludeFolders || [],
        files: options.files || [],
    };
    // default export file should never be index
    // all of the files in the directory will be exported in index.ts
    if(config.defaultExportFile.includes('index')) {
        config.defaultExportFile = config.defaultExportFile = ''
    }

    checkForCommandLineFlags(config);

    // Ensure defaultExportFile is added to the files list
    if (config.defaultExportFile && fs.existsSync(path.join(config.directory, config.defaultExportFile))) {
        if (!config.files.includes(config.defaultExportFile)) {
            config.files.push(config.defaultExportFile);
        }
    }

    console.log("Starting auto-exporter script");
    console.log(pc.cyan("Current Configuration:"), JSON.stringify(config, null, 2));

    const exportsList = generateExportsFromDir(config.directory, config);
    fs.writeFileSync(path.join(config.directory, "index.ts"), exportsList.join('\n'));
    console.log(pc.green(`\nExports generated in index.ts\n`));
}
