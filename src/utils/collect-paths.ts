import * as fs from 'fs';
import path from 'path';
import { AutoExporterOptions } from "../types/types";

/**
 * Recursively collects paths of files from the specified directory.
 * It allows certain folders to be excluded based on the provided configuration.
 * 
 * @param {string} startPath - The path to the directory from which files need to be collected.
 * @param {AutoExporterOptions} config - Configuration options which may include folders to exclude.
 * @returns {string[]} An array of paths for the files inside the `startPath` excluding specified folders.
 * 
 * @example
 * 
 * const paths = collectPaths('./src', { excludeFolders: ['test'] });
 * console.log(paths);  // ['/src/file1.js', '/src/file2.js', ...]
 */
export function collectPaths(startPath: string, config: AutoExporterOptions): string[] {
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
            // Check if the file is named 'index.ts' or 'index.tsx'
            if (['index.ts', 'index.tsx'].includes(file)) {
                console.log(`Excluding file: ${file}`);
                continue;
            }
            paths.push(filename);
        }
    }
    return paths;
}
