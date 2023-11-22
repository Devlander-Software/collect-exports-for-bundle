import * as fs from 'fs/promises'
import path from 'path'
import { isValidExtension } from '../../extensions/is-valid-extension'
import { AutoExporterOptions } from '../../types/module-exporter.types'
import { logMessageForFunction } from '../../utils/log-with-color'
import { ResultItemType, pushToResults } from '../../utils/push-to-results'
import { BundleExportAsFunctionParams } from '../bundle-export-as-function'
import { getAbsolutePath } from './absolute-path'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'
import { getCachedDirectory } from './get-cached-directory'

export async function collectPaths(
  startPath: string,
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): Promise<string[]> {
  console.log(`Collecting paths from: ${startPath}`)
  let paths: string[] = []
  let absolutePath: string | undefined = undefined
  const resultFromGetAbsolutePath = await getAbsolutePath(startPath, {
    debug: config.debug,
    results: config.results,
    excludedFolders: config.excludedFolders,
    allowedExtensions:
      config && config.allowedExtensions ? config.allowedExtensions : []
  })

  paths = resultFromGetAbsolutePath.paths
  absolutePath = resultFromGetAbsolutePath.absolutePath ?? undefined

  if (!absolutePath) {
    console.log(`No absolute path found for: ${startPath}`)
    return paths
  }

  try {
    const files = await fs.readdir(absolutePath)
    console.log(`Files in directory '${absolutePath}': ${files.join(', ')}`)

    for (const file of files) {
      const filename = path.join(absolutePath, file)
      if (config.debug) {
        logMessageForFunction('collectPaths', { files })
        logMessageForFunction('collectPaths', { filename })
      }

      const isDirectory = await getCachedDirectory(filename)
      if (config.debug) {
        logMessageForFunction('collectPaths', { isDirectory })
      }

      if (isDirectory) {
        if (config.excludedFolders && config.excludedFolders.includes(file)) {
          if (config.debug) {
            logMessageForFunction(
              'collectPaths',
              { filename },
              'directory included'
            )
          }
          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.ExcludedFolder,
              { nameOrPath: filename, reason: ['Directory is excluded'] }
            )
          }
          continue
        } else {
          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.IncludedFolder,
              { nameOrPath: filename, reason: ['Directory is included'] }
            )
          }
          paths = paths.concat(await collectPaths(filename, config))
        }
      } else {
        if (['index.ts', 'index.tsx'].includes(file)) {
          console.log(`Skipping index file: ${filename}`)
          continue
        }

        const validFile = isValidExtension(
          file,
          config && config.allowedExtensions ? config.allowedExtensions : [],
          config.debug
        )

        if (!validFile) {
          logMessageForFunction(
            'collectPaths',
            { filename },
            'invalid file',
            'bgRed'
          )
          if (config.ignoredExtensions) {
            const ignoredExtensions = config.ignoredExtensions
            logMessageForFunction(
              'collectPaths',
              { ignoredExtensions, filename },
              'valid file',
              'bgGreen'
            )
          }

          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.ExcludedFile,
              { nameOrPath: filename, reason: ['File has invalid extension'] }
            )
          }
          continue
        } else {
          if (config.allowedExtensions) {
            const allowedExtensions = config.allowedExtensions

            logMessageForFunction(
              'collectPaths',
              { filename, allowedExtensions },
              'valid file',
              'bgGreen'
            )
          }
          console.log(`Adding file to paths: ${filename}`)
          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.IncludedFile,
              { nameOrPath: filename, reason: ['File has valid extension'] }
            )
          }
          paths.push(filename)
        }
      }
    }
  } catch (error) {
    console.error(`Error in collectPaths for path ${absolutePath}:`, error)
  }

  return paths
}
