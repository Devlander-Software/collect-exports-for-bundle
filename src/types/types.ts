export interface ModuleExportOptions {
  rootDir?: string
  targetVersion?: 'es6' | 'es5' // More widely recognized term
  primaryExportFile?: string // More descriptive about its role
  allowedExtensions?: string[] // Implies there are extensions that are allowed
  exportMode?: 'named' | 'default' | 'both' // 'Type' is a bit ambiguous
  outputFilenameExtension?: '.ts' | '.tsx' // More descriptive
  ignoredExtensions?: string[] // Implies there are extensions that are ignored
  specificFiles?: string[] // 'Specific' indicates intention
  excludedFolders?: string[] // Consistency with 'ignoredExtensions'
}

export interface ParsedArgs {
  directory?: string
  defaultExportFile?: string
  includeExtensions?: string[]
  excludeExtensions?: string[]
  excludeFolders?: string[]
  files?: string[]
  _: (string | number)[]
  $0: string
}

export type TColor = 'green' | 'red' | 'blue'
