import * as fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { fileHasValidExtension } from './has-valid-extension';
import { AutoExporterOptions } from "./types";

export function generateExportsFromDir(startPath: string, config: AutoExporterOptions): string[] {
    const collectedPaths: string[] = collectPaths(startPath, config);
    const distinctPaths = [...new Set(collectedPaths)]; // Remove duplicates using Set
    return generateExportsFromPaths(distinctPaths, config);
}

function collectPaths(startPath: string, config: AutoExporterOptions): string[] {
    let paths: string[] = [];

    if (!fs.existsSync(startPath)) {
        console.log("Directory does not exist:", startPath);
        return paths;
    }

    const files = fs.readdirSync(startPath);
    for (const file of files) {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            // Skip if the directory is in the excludeFolders list
            if (config.excludeFolders && config.excludeFolders.includes(file)) {
                console.log(`Excluding folder: ${file}`);
                continue;
            }
            // Recursively collect paths for subdirectories
            paths = paths.concat(collectPaths(filename, config));
        } else {
            paths.push(filename);
        }
    }
    return paths;
}

function generateExportsFromPaths(paths: string[], config: AutoExporterOptions): string[] {
    let results: string[] = [];

    for (const filename of paths) {
        if (config.files && !config.files.includes(filename)) {
            // Skip the file if it's not in the 'files' list
            console.log(`File not in the specified list, skipping: ${filename}`);
            continue;
        } else if (fileHasValidExtension(filename, config) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
            const relativePath = `./${path.relative(config.directory, filename).replace(/\\/g, '/')}`;
            const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));

            const componentName = path.basename(filename, path.extname(filename));
            results.push(`/**\n * TSDoc for ${componentName}\n */`);
            results.push(`export * from "${withoutExtension}";`);

            console.log(pc.green(`Exported: ${pc.bold(componentName)} from ${pc.blue(relativePath)}`));
        } else {
            console.log(`Excluding from valid file paths: ${filename}`);
        }
    }

    return results;
}
