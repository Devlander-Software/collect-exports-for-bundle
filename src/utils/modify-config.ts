import {
  AutoExporterOptions,
  ModuleExportOptions
} from '../types/module-exporter.types'
import { checkForCircularDeps } from './check-for-circular-deps'
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
    bundleAsFunctionForDefaultExportAs: undefined,
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

  console.log('allowedExt', allowedExt)
  console.log('ignored extensions before', ignoredExt)

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
    bundleAsFunctionForDefaultExportAs:
      options.bundleAsFunctionForDefaultExportAs &&
      typeof options.bundleAsFunctionForDefaultExportAs === 'string'
        ? options.bundleAsFunctionForDefaultExportAs
        : defaultAutoExportConfig.bundleAsFunctionForDefaultExportAs,
    debug: defaultAutoExportConfig.debug,
    exportMode: options.exportMode || defaultAutoExportConfig.exportMode,
    testOptions: options.testOptions || defaultAutoExportConfig.testOptions
  }

  const circularDeps = await checkForCircularDeps(modifiedConfig)

  console.log('circularDeps', circularDeps)

  return modifiedConfig
}
