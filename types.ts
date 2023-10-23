
export interface AutoExporterOptions {
    directory?: string;
    defaultExportFile?: string;
    includeExtensions?: string[];
    saveEntryFileWithExtension?:  '.ts' | '.tsx' 
    excludeExtensions?: string[];
    files?: string[];               // New Parameter
    excludeFolders?: string[];     // New Parameter
}

export interface ParsedArgs  {
    directory?: string;
    defaultExportFile?: string;
    includeExtensions?: string[];
    excludeExtensions?: string[];
    excludeFolders?: string[];
    files?: string[];
    _: (string | number)[];
    $0: string;
}

export type TColor = "green" | "red" | "blue";
