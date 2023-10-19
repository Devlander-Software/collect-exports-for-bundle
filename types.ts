
export interface AutoExporterOptions {
    directory?: string;
    defaultExportFile?: string;
    includeExtensions?: string[];
    excludeExtensions?: string[];
    files?: string[];               // New Parameter
    excludeFolders?: string[];     // New Parameter
}