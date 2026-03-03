import * as path from 'path'
import { getExtensions } from '../extensions/get-extensions'
import {
  AutoExporterOptions,
  ModuleExportOptions
} from '../types/module-exporter.types'
import { logMessageForFunction } from './log-with-color'

/** Normalize alias keys to canonical config keys */
function normalizeOptions(
  opts: ModuleExportOptions & {
    bundleDefaultAsObject?: string
    outputPath?: string
    includeBarrelFiles?: boolean
  }
): ModuleExportOptions {
  const o = { ...opts }
  if (
    o.bundleDefaultAsObject !== undefined &&
    o.bundleAsObjectForDefaultExport === undefined
  ) {
    o.bundleAsObjectForDefaultExport = o.bundleDefaultAsObject
  }
  if (o.outputPath) {
    const parsed = path.parse(o.outputPath)
    o.outputFileName = parsed.name
    o.outputFilenameExtension = (parsed.ext || '.ts') as '.ts' | '.tsx'
  }
  if (o.includeBarrelFiles !== undefined && o.includeIndexes === undefined) {
    o.includeIndexes = o.includeBarrelFiles
  }
  return o
}

export const modifyConfig = async (
  options: ModuleExportOptions
): Promise<AutoExporterOptions> => {
  const optionsNormalized = normalizeOptions(
    options as ModuleExportOptions & {
      bundleDefaultAsObject?: string
      outputPath?: string
      includeBarrelFiles?: boolean
    }
  )
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
    excludedFolders: ['node_modules', '.github', '.storybook'],
    specificFiles: [],
    outputFilenameExtension: '.ts',
    outputFileName: 'index',
    bundleAsObjectForDefaultExport: undefined,
    debug: false,
    includeIndexes: true,
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

  if (optionsNormalized.debug) {
    defaultAutoExportConfig.debug = true
  }

  const allowedExt = getExtensions(
    optionsNormalized.allowedExtensions ||
      defaultAutoExportConfig.allowedExtensions,
    [],
    defaultAutoExportConfig.debug,
    'allowedExtensions'
  )
  const ignoredExt = getExtensions(
    optionsNormalized.ignoredExtensions ||
      defaultAutoExportConfig.ignoredExtensions,
    allowedExt,
    defaultAutoExportConfig.debug,
    'ignoredExtensions'
  )

  const modifiedConfig: AutoExporterOptions = {
    ...optionsNormalized,
    excludeSpecificFiles: optionsNormalized.excludeSpecificFiles || [],
    rootDir: optionsNormalized.rootDir || defaultAutoExportConfig.rootDir,
    primaryExportFile:
      optionsNormalized.primaryExportFile &&
      typeof optionsNormalized.primaryExportFile === 'string'
        ? optionsNormalized.primaryExportFile
        : defaultAutoExportConfig.primaryExportFile,
    allowedExtensions: allowedExt,
    ignoredExtensions: ignoredExt,
    excludedFolders: [...defaultAutoExportConfig.excludedFolders],
    specificFiles:
      optionsNormalized.specificFiles || defaultAutoExportConfig.specificFiles,
    outputFileName:
      optionsNormalized.outputFileName ||
      defaultAutoExportConfig.outputFileName,
    outputFilenameExtension:
      optionsNormalized.outputFilenameExtension ||
      defaultAutoExportConfig.outputFilenameExtension,
    bundleAsObjectForDefaultExport:
      optionsNormalized.bundleAsObjectForDefaultExport &&
      typeof optionsNormalized.bundleAsObjectForDefaultExport === 'string'
        ? optionsNormalized.bundleAsObjectForDefaultExport
        : defaultAutoExportConfig.bundleAsObjectForDefaultExport,
    debug: defaultAutoExportConfig.debug,
    includeIndexes:
      optionsNormalized.includeIndexes ??
      defaultAutoExportConfig.includeIndexes,
    exportMode:
      optionsNormalized.exportMode || defaultAutoExportConfig.exportMode,
    testOptions:
      optionsNormalized.testOptions || defaultAutoExportConfig.testOptions,
    useTypeScriptAPI: optionsNormalized.useTypeScriptAPI ?? false,
    barrelMode: optionsNormalized.barrelMode ?? 'single',
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
          optionsNormalized.excludedFolders ||
          defaultAutoExportConfig.excludedFolders,
        specificFiles:
          optionsNormalized.specificFiles ||
          defaultAutoExportConfig.specificFiles,
        rootDir: optionsNormalized.rootDir || defaultAutoExportConfig.rootDir
      }
    }
  }

  if (optionsNormalized.excludedFolders) {
    modifiedConfig.excludedFolders = [
      ...defaultAutoExportConfig.excludedFolders,
      ...optionsNormalized.excludedFolders
    ]
  }

  if (optionsNormalized.title) {
    modifiedConfig.title = optionsNormalized.title
  }

  if (optionsNormalized.description) {
    modifiedConfig.description = optionsNormalized.description
  }
  logMessageForFunction('modifyConfig', {
    options,
    modifiedConfig
  })

  return modifiedConfig
}
