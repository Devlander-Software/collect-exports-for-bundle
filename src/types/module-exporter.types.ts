import { TestOptions } from './test-options.types'

/**
 * Options to configure how modules should be exported.
 *
 * @property {string} [rootDir] - The directory that will be scanned for files to export.
 *                               Default is 'src' if not specified.
 * @property {'es6' | 'es5'} [targetVersion] - Format of the output index file.
 *                                            Default is 'es6' if not specified.
 * @property {string} [primaryExportFile] - The file that will be exported as default.
 *                                         If not specified, there won't be a default export.
 * @property {string} [bundleAsFunctionForDefaultExportAs] - this will bundle everything up into a single function rather than multiple exports in the index file
 *                                         it will also be the default export, if not specified, it will just ignore it. primaryExportFile will be ignored if this is specified
 *                                       If will also not bundle up any interfaces, types or enums
 * @property {string[]} [allowedExtensions] - Extensions of files to be exported.
 *                                           Defaults are ['.ts', '.tsx', '.component.tsx', '.component.ts'].
 * @property {'named' | 'default' | 'both'} [exportMode] - Mode of export, whether named, default or both. by default, it is named
 *
 * @property {'.ts' | '.tsx'} [outputFilenameExtension] - File extension for the output file.
 *                                                       Default is '.ts' if not specified.
 * @property {'.ts' | '.tsx'} [outputFileName] - File name for the output file.
 *                                                       Default is 'index' if not specified.
 * @property {string[]} [ignoredExtensions] - Extensions of files to be ignored.
 *                                           Defaults are ['.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts'].
 * @property {string[]} [specificFiles] - Only exports the specified files instead of scanning the whole rootDir.
 *                                        By default, it scans all files in rootDir with allowedExtensions.
 * @property {string[]} [excludedFolders] - Folders to be ignored during export.
 *                                          Default is ['node_modules'] if not specified.
 */

export interface BaseModuleExportOptions {
  rootDir?: string
  targetVersion?: 'es6' | 'es5'
  allowedExtensions?: string[]
  exportMode?: 'named' | 'default' | 'both'
  outputFileName?: string
  outputFilenameExtension?: '.ts' | '.tsx'
  ignoredExtensions?: string[]
  specificFiles?: string[]
  excludedFolders?: string[]
  testOptions?: TestOptions
  debug?: boolean
}

export interface AutoExporterOptions {
  rootDir: string
  targetVersion?: 'es6' | 'es5'
  allowedExtensions: string[]
  exportMode: 'named' | 'default' | 'both'
  outputFileName: string
  outputFilenameExtension: '.ts' | '.tsx'
  ignoredExtensions: string[]
  primaryExportFile?: string | undefined
  specificFiles: string[]
  excludedFolders: string[]
  bundleAsObjectForDefaultExport?: string | undefined
  testOptions?: TestOptions
  debug: boolean
}

// These types enforce the constraints when used
export type ExclusivePrimaryExportFile<
  T extends {
    exportMode?: 'named' | 'default' | 'both'
    primaryExportFile?: string
  }
> = T['exportMode'] extends 'named' ? never : T['primaryExportFile']

export type ExclusiveBundleAsFunction<
  T extends {
    bundleAsFunctionForDefaultExportAs?: string
    primaryExportFile?: string
    exportMode?: 'named' | 'default' | 'both'
  }
> = T['exportMode'] extends 'named'
  ? never
  : T['bundleAsFunctionForDefaultExportAs']

// Create a type that combines the base options with the conditional ones
export type ModuleExportOptions = BaseModuleExportOptions & {
  primaryExportFile?: ExclusivePrimaryExportFile<BaseModuleExportOptions>
  bundleAsObjectForDefaultExport?: ExclusiveBundleAsFunction<BaseModuleExportOptions>
}

