import * as fs from 'fs/promises'
import path from 'path'
import { fileHasValidExtension } from '../../extensions/has-valid-extension'
import { parseComplexExtensionFromPath } from '../../extensions/parse-complex-extension-from-path'
import { AutoExporterOptions } from '../../types/module-exporter.types'
import { logMessageForFunction } from '../../utils/log-with-color'
import { ResultItemType, pushToResults } from '../../utils/push-to-results'
import { BundleExportAsFunctionParams } from '../bundle-export-as-function'
import { collectPaths } from './collect-paths'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'

export async function processDirectoryContents(
  directoryPath: string,
  paths: string[],
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): Promise<string[]> {
  const files = await fs.readdir(directoryPath)

  for (const file of files) {
    const { fileName, folderName } = parseComplexExtensionFromPath(file)

    const filename = path.join(directoryPath, file)

    const isDirectory = (await fs.lstat(filename)).isDirectory()
    if (config.debug) {
      logMessageForFunction('processDirectoryContents', {
        fileName,
        folderName,
        file,
        filename,
        isDirectory
      })
    }
    if (config.results) {
      if (isDirectory) {
        config.results = pushToResults(
          config.results,
          ResultItemType.IncludedFolder,
          { nameOrPath: filename, reason: ['Found directory'] }
        )
      }
    }

    if (isDirectory) {
      if (config.excludedFolders && config.excludedFolders.includes(file)) {
        if (config.results) {
          config.results = pushToResults(
            config.results,
            ResultItemType.ExcludedFolder,
            { nameOrPath: filename, reason: ['Directory is excluded'] }
          )
        }
        continue
      } else {
        paths = paths.concat(await collectPaths(filename, config))
      }
    } else {
      if (['index.ts', 'index.tsx'].includes(file)) {
        continue
      }
      const { fileName } = parseComplexExtensionFromPath(filename)

      const validFile = fileName
        ? fileHasValidExtension(fileName, config)
        : false
      if (config.debug) {
        console.log(`Valid file: ${validFile} in processDirectoryContents`)
      }

      if (!validFile) {
        if (config.results) {
          config.results = pushToResults(
            config.results,
            ResultItemType.ExcludedFile,
            { nameOrPath: filename, reason: ['File has invalid extension'] }
          )
        }
        if (config.debug) {
          console.log(`Invalid file in processDirectoryContents ${filename}`)
        }
        continue
      }

      if (config.debug) {
        console.log(
          `Pushing filename to paths in processDirectoryContents ${filename}`
        )
      }
      if (config.results) {
        config.results = pushToResults(
          config.results,
          ResultItemType.IncludedFile,
          { nameOrPath: filename, reason: ['File has valid extension'] }
        )
      }
      logMessageForFunction(
        'processDirectoryContents',
        {
          paths,
          filename
        },
        'this is paths'
      )

      paths.push(filename)
    }
  }

  return paths
}
