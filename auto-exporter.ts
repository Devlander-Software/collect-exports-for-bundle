import * as fs from 'fs';
import * as path from 'path';
import * as pc from 'picocolors';
import { generateExportsFromDir } from './generate-exports-from-dir'; // Assuming you named the file containing the new function like this
import { AutoExporterOptions } from './types';

export const createTestFolderAndFiles = (folderPath: string, files: string[]): void => {
    fs.mkdirSync(folderPath, { recursive: true });
    for (const file of files) {
        fs.writeFileSync(path.join(folderPath, file), '');
    }
}

export function autoExporter(options: AutoExporterOptions = {}): void {
    const config: AutoExporterOptions = {
        directory: options.directory || 'src',
        defaultExportFile: options.defaultExportFile || 'index.ts',
        includeExtensions: options.includeExtensions || ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts', '.table.ts'],
        excludeExtensions: options.excludeExtensions || ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts', '.styles.tsx', '.styles.ts', '.keys.ts'],
        excludeFolders: options.excludeFolders || [],
        files: options.files || []
    };

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

    const exportsList = generateExportsFromDir(config.directory, config);
    fs.writeFileSync(path.join(config.directory, config.defaultExportFile), exportsList.join('\n'));
    console.log(pc.green(`\nExports generated in ${config.defaultExportFile}\n`));
}
