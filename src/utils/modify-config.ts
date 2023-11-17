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
    exportMode: 'named',
    excludeSpecificFiles: [],
    results: {
      title: 'Devlander Collect Export Results',
      description: 'Here are the results of the export collection',
      startTime: new Date().getTime(),
      endTime: 0,
      duration: '',
      includedFolders: [],
      includedFiles: [],
      excludedFolders: [],
      excludedFiles: [],
      includedExports: [],
      excludedExports: [],
      withParameters: {
        ignoredExtensions: [],
        allowedExtensions: [],
        excludedFolders: [],
        specificFiles: [],
        rootDir: ''
      }
    }
  }

  if (options.debug) {
    defaultAutoExportConfig.debug = true
  }

  const allowedExt = getExtensions(
    options.allowedExtensions || defaultAutoExportConfig.allowedExtensions,
    [],
    defaultAutoExportConfig.debug,
    'allowedExtensions'
  )
  const ignoredExt = getExtensions(
    options.ignoredExtensions || defaultAutoExportConfig.ignoredExtensions,
    allowedExt,
    defaultAutoExportConfig.debug,
    'ignoredExtensions'
  )

  const modifiedConfig: AutoExporterOptions = {
    ...options,
    excludeSpecificFiles: options.excludeSpecificFiles || [],
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
    testOptions: options.testOptions || defaultAutoExportConfig.testOptions,
    results: {
      ...defaultAutoExportConfig.results,
      title: options.title ? options.title : 'Devlander Collect Export Results',
      description: options.description
        ? options.description
        : 'Here are the results of the export collection',
      withParameters: {
        ignoredExtensions: ignoredExt,
        allowedExtensions: allowedExt,
        excludedFolders:
          options.excludedFolders || defaultAutoExportConfig.excludedFolders,
        specificFiles:
          options.specificFiles || defaultAutoExportConfig.specificFiles,
        rootDir: options.rootDir || defaultAutoExportConfig.rootDir
      }
    }
  }

  if (options.title) {
    modifiedConfig.title = options.title
  }

  if (options.description) {
    modifiedConfig.description = options.description
  }

  return modifiedConfig
}
