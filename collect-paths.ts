import * as fs from 'fs';
import path from 'path';
import { AutoExporterOptions } from "./types";

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
            paths.push(filename);
        }
    }
    return paths;
}