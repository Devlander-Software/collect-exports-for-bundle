/**
 * Options to configure how modules should be exported.
 *
 * @property {string} [rootDir] - The directory that will be scanned for files to export.
 *                               Default is 'src' if not specified.
 * @property {'es6' | 'es5'} [targetVersion] - Format of the output index file.
 *                                            Default is 'es6' if not specified.
 * @property {string} [primaryExportFile] - The file that will be exported as default.
 *                                         If not specified, there won't be a default export.
 * @property {string[]} [allowedExtensions] - Extensions of files to be exported.
 *                                           Defaults are ['.ts', '.tsx', '.component.tsx', '.component.ts'].
 * @property {'named' | 'default' | 'both'} [exportMode] - Mode of export, whether named, default or both.
 * @property {'.ts' | '.tsx'} [outputFilenameExtension] - File extension for the output file.
 *                                                       Default is '.ts' if not specified.
 * @property {string[]} [ignoredExtensions] - Extensions of files to be ignored.
 *                                           Defaults are ['.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts'].
 * @property {string[]} [specificFiles] - Only exports the specified files instead of scanning the whole rootDir.
 *                                        By default, it scans all files in rootDir with allowedExtensions.
 * @property {string[]} [excludedFolders] - Folders to be ignored during export.
 *                                          Default is ['node_modules'] if not specified.
 */
export interface ModuleExportOptions {
  rootDir?: string
  targetVersion?: 'es6' | 'es5'
  primaryExportFile?: string
  allowedExtensions?: string[]
  exportMode?: 'named' | 'default' | 'both'
  outputFilenameExtension?: '.ts' | '.tsx'
  ignoredExtensions?: string[]
  specificFiles?: string[]
  excludedFolders?: string[]
}

/**
 * Represents parsed arguments from the command line.
 *
 * @property {string} [directory] - Directory for the operation.
 * @property {string} [defaultExportFile] - The file to be exported as default.
 * @property {string[]} [includeExtensions] - Extensions of files to be included.
 * @property {string[]} [excludeExtensions] - Extensions of files to be excluded.
 * @property {string[]} [excludeFolders] - Folders to be excluded from operation.
 * @property {string[]} [files] - Specific files for the operation.
 * @property {(string | number)[]} _ - Positional arguments.
 * @property {string} $0 - The command or script name.
 */
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

/**
 * Represents color options.
 *
 * @typedef TColor
 * @type {'green' | 'red' | 'blue' | 'yellow'}
 */
export type TColor = 'green' | 'red' | 'blue' | 'yellow'
