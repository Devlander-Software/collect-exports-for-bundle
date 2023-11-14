import {
  AutoExporterOptions,
  ModuleExportOptions
} from '../types/module-exporter.types'
import { getExtensions } from './get-extensions'

export const modifyConfig = async (
  options: ModuleExportOptions
): Promise<AutoExporterOptions> => {
  const defaultAutoExportConfig: AutoExporterOptions = {
    rootDir: 'src',
    primaryExportFile: '',
    allowedExtensions: ['.ts', '.tsx'],
    ignoredExtensions: [
      '.test.tsx',
      '.test.ts',
      '.stories.tsx',
      '.stories.ts',
      '.stories.tsx'
    ],
    excludedFolders: [],
    specificFiles: [],
    outputFilenameExtension: '.ts',
    outputFileName: 'index',
    bundleAsObjectForDefaultExport: undefined,
    debug: false,
    exportMode: 'named'
  }

  if (options.debug) {
    defaultAutoExportConfig.debug = true
  }

  const allowedExt = getExtensions(
    options.allowedExtensions || defaultAutoExportConfig.allowedExtensions,
    [],
    defaultAutoExportConfig.debug
  )
  const ignoredExt = getExtensions(
    options.ignoredExtensions || defaultAutoExportConfig.ignoredExtensions,
    allowedExt,
    defaultAutoExportConfig.debug
  )

  const modifiedConfig: AutoExporterOptions = {
    ...options,
    rootDir: options.rootDir || defaultAutoExportConfig.rootDir,
    primaryExportFile:
      options.primaryExportFile && typeof options.primaryExportFile === 'string'
        ? options.primaryExportFile
        : defaultAutoExportConfig.primaryExportFile,
    allowedExtensions: allowedExt,
    ignoredExtensions: ignoredExt,
    excludedFolders:
      options.excludedFolders || defaultAutoExportConfig.excludedFolders,
    specificFiles:
      options.specificFiles || defaultAutoExportConfig.specificFiles,
    outputFileName:
      options.outputFileName || defaultAutoExportConfig.outputFileName,
    outputFilenameExtension:
      options.outputFilenameExtension ||
      defaultAutoExportConfig.outputFilenameExtension,
    bundleAsObjectForDefaultExport:
      options.bundleAsObjectForDefaultExport &&
      typeof options.bundleAsObjectForDefaultExport === 'string'
        ? options.bundleAsObjectForDefaultExport
        : defaultAutoExportConfig.bundleAsObjectForDefaultExport,
    debug: defaultAutoExportConfig.debug,
    exportMode: options.exportMode || defaultAutoExportConfig.exportMode,
    testOptions: options.testOptions || defaultAutoExportConfig.testOptions
  }

  return modifiedConfig
}
