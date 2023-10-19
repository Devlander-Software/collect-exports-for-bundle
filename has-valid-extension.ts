import { AutoExporterOptions } from "./types";
export function fileHasValidExtension(filename: string, config: AutoExporterOptions): boolean {
    const isIncluded = config.includeExtensions.some(ext => filename.endsWith(ext));
    const isExcluded = config.excludeExtensions.some(ext => filename.endsWith(ext));

    console.log(`Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`);

    return isIncluded && !isExcluded;
}