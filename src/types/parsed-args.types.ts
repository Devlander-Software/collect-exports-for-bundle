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
