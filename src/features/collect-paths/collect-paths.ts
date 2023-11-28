import * as fs from 'fs/promises'
import path from 'path'
import { bgBlack, bgGreen, bgRed, blue, bold, white } from 'picocolors'
import { isFilePath } from '../../constraints/is-file-path'
import { removeFoldersFromPaths } from '../../export-related/remove-folders-from-paths'
import { fileHasValidExtension } from '../../extensions/has-valid-extension'
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
  if (isFilePath(startPath) === false) {
    return []
  }
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

  if (paths && config.excludedFolders) {
    paths = removeFoldersFromPaths(paths, config.excludedFolders)
  }
  if (!absolutePath) {
    if (!paths.length) {
      console.log(
        `${bgBlack(white(bold('No absolute path found for')))}: ${bgRed(
          white(bold(startPath))
        )}`
      )
    } else {
      console.log(
        `${bgBlack(white(bold('Paths collected')))} for ${blue(
          `${startPath}`
        )}: ${bgGreen(white(bold(paths.join(', '))))}`
      )
    }

    return paths
  }

  try {
    const files = await fs.readdir(absolutePath)
    console.log(`Files in directory '${absolutePath}': ${files.join(', ')}`)

    for (const file of files) {
      const filepath = path.join(absolutePath, file)

      const isDirectory = await getCachedDirectory(filepath)
      if (config.debug) {
        logMessageForFunction('collectPaths', { isDirectory })
      }

      if (isDirectory) {
        if (config.excludedFolders && config.excludedFolders.includes(file)) {
          if (config.debug) {
            logMessageForFunction(
              'collectPaths',
              { filepath, file },
              'directory included'
            )
          }
          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.ExcludedFolder,
              {
                nameOrPath: filepath,
                reason: [
                  `Directory is excluded because ${file} was in excludedFolders `
                ]
              }
            )
          }
          continue
        } else {
          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.IncludedFolder,
              {
                nameOrPath: filepath,
                reason: [
                  `Directory is included because it was not included in excluded Folders`
                ]
              }
            )
          }
          paths = paths.concat(await collectPaths(filepath, config))
        }
      } else {
        if (['index.ts', 'index.tsx'].includes(file)) {
          console.log(`Skipping index file: ${filepath}`)
          continue
        }

        const validFile = fileHasValidExtension(
          filepath,
          config as AutoExporterOptions
        )

        if (validFile === false) {
          if (config.ignoredExtensions && config.debug) {
            const ignoredExtensions = config.ignoredExtensions
            logMessageForFunction(
              'collectPaths',
              { ignoredExtensions, filepath },
              'invalid file',
              'bgRed'
            )
          } else {
            // console.log ignoredExtensions and the highlight just the extension in red if it can find it

            console.log(`Skipping file: ${filepath} because because it has an invalid extension which was found in ignoredExtensions \n

            `)
          }

          if (config.results && validFile === false) {
            config.results = pushToResults(
              config.results,
              ResultItemType.ExcludedFile,
              { nameOrPath: filepath, reason: ['File has invalid extension'] }
            )
          }
          continue
        } else if (validFile === true) {
          if (config.allowedExtensions && config.debug) {
            const allowedExtensions = config.allowedExtensions

            logMessageForFunction(
              'collectPaths',
              { filepath, allowedExtensions },
              'valid file',
              'bgGreen'
            )
          } else {
            console.log(`Adding file to paths: ${filepath}`)
          }

          if (config.results) {
            config.results = pushToResults(
              config.results,
              ResultItemType.IncludedFile,
              { nameOrPath: filepath, reason: ['File has valid extension'] }
            )
          }
          paths.push(filepath)
        }
      }
    }
  } catch (error) {
    console.error(`Error in collectPaths for path ${absolutePath}:`, error)
  }

  return paths
}
