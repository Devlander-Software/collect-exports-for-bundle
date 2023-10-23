import { AutoExporterOptions } from "../types/types";
export function fileHasValidExtension(filename: string, config: AutoExporterOptions): boolean {
    if(!config.includeExtensions || config.includeExtensions.length === 0) {
        throw new Error('Include extensions are required');
    }

    if(!config.excludeExtensions || config.excludeExtensions.length === 0) {
        throw new Error('Exclude extensions are required');
    }
    const isIncluded = config.includeExtensions.some(ext => filename.endsWith(ext));
    const isExcluded = config.excludeExtensions.some(ext => filename.endsWith(ext));

    console.log(`Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`);

    return isIncluded && !isExcluded;
}