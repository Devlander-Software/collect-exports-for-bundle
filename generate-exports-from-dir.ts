import * as fs from 'fs';
import path from 'path';
import { green, red, yellow } from 'picocolors';
import { collectPaths } from './collect-paths';
import { fileHasValidExtension } from './has-valid-extension';
import { AutoExporterOptions } from "./types";

export function generateExportsFromDir(startPath: string, config: AutoExporterOptions): string[] {
    console.log(green('Starting export generation from directory...'));
    const collectedPaths: string[] = collectPaths(startPath, config);
    const distinctPaths = [...new Set(collectedPaths)]; // Remove duplicates using Set
    return generateExportsFromPaths(distinctPaths, config);
}

function hasNamedExports(fileContent: string): boolean {
    return /export\s+(?!default)/.test(fileContent);
}

function hasDefaultExport(fileContent: string): boolean {
    return /export default/.test(fileContent);
}

export function extractDefaultExportVariable(filepath: string): string | null {
    console.log(green(`Extracting default export from ${filepath}...`));
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const defaultExportMatch = fileContent.match(/export default (\w+)/);
    return defaultExportMatch ? defaultExportMatch[1] : null;
}

export function generateExportsFromPaths(paths: string[], config: AutoExporterOptions): string[] {
    console.log(green('Generating exports from provided paths...'));
    let results: string[] = [];
    let defaultExportString: string[] = [];
    if(!config.directory || config.directory === '') {
        throw new Error('Directory is required');
    }

    for (const filename of paths) {
        const fileContent = fs.readFileSync(filename, 'utf-8'); // Reading the content of the file
        const relativePath = `./${path.relative(config.directory, filename).replace(/\\/g, '/')}`;
        const withoutExtension = relativePath.substring(0, relativePath.lastIndexOf('.'));
        const componentName = path.basename(filename, path.extname(filename));

        if (config.files && config.files.includes(filename)) {
            console.log(yellow(`Processing included file: ${filename}...`));
            if (filename.endsWith(config.defaultExportFile || '') && hasDefaultExport(fileContent)) {
                const defaultVariable = extractDefaultExportVariable(filename);
                if (defaultVariable) {
                    defaultExportString.push(`import ${defaultVariable} from "${withoutExtension}";`);
                    defaultExportString.push(`export default ${defaultVariable};`);
                } else {
                    console.error(red(`Failed to extract default export from ${filename}.`));
                }
            } else if (hasNamedExports(fileContent)) {
                results.push(`/**\n * TSDoc for ${componentName}\n */`);
                results.push(`export * from "${withoutExtension}";`);
            }
        } else if (fileHasValidExtension(filename, config) && hasNamedExports(fileContent)) {
            results.push(`/**\n * TSDoc for ${componentName}\n */`);
            results.push(`export * from "${withoutExtension}";`);
        }
    }

    return [...results, ...defaultExportString];
}
