import * as fs from 'fs/promises'
import path from 'path'
import { red } from 'picocolors'
import { isFilePath } from '../../constraints/is-file-path'
import { correctDuplicateDriveLetters } from '../../conversions/correct-duplicate-drive-letters'
import { removeFoldersFromPaths } from '../../export-related/remove-folders-from-paths'
import { Results } from '../../types/module-exporter.types'
import {
  logColoredMessage,
  logFailedMessage,
  logMessageForFunction
} from '../../utils/log-with-color'

export const getAbsolutePath = async (
  startPath: string,
  config: {
    debug?: boolean
    results?: Results
    excludedFolders?: string[]
    includeIndexes?: boolean
    allowedExtensions: string[]
    ignoredExtensions?: string[]
  }
): Promise<{ paths: string[]; absolutePath?: string }> => {
  try {
    let myPath = path.normalize(path.resolve(startPath))
    logColoredMessage(`Starting to get absolute path from ${myPath}`, 'blue')
    myPath = correctDuplicateDriveLetters(myPath)
    logColoredMessage(`Corrected path to ${myPath}`, 'blue')

    let pathsToTry = [
      myPath,
      path.normalize(path.resolve(startPath)),
      correctDuplicateDriveLetters(path.normalize(path.resolve(startPath))),
      `./${startPath}/`,
      `${startPath}/`
    ]
    if (config && config.excludedFolders) {
      red(`${config.excludedFolders} is excluded`)

      pathsToTry = removeFoldersFromPaths(pathsToTry, config.excludedFolders)
    }
    logMessageForFunction('getAbsolutePath', { pathsToTry, config })

    const validPaths = []
    let absolutePath

    for (const pathToTry of pathsToTry) {
      if (isFilePath(pathToTry)) {
        if (config.debug) {
          logColoredMessage(`Checking path: ${pathToTry}`, 'magenta')
        }

        try {
          const stat = await fs.lstat(pathToTry)
          if (stat.isDirectory()) {
            const directoryFiles = await fs.readdir(pathToTry)
            const indexFiles = directoryFiles.filter(
              (file) =>
                file.startsWith('index.') &&
                config.allowedExtensions.includes(path.extname(file))
            )

            // Determine whether to include index files
            if (
              config.includeIndexes &&
              indexFiles.length > 0 &&
              pathToTry !== startPath
            ) {
              indexFiles.forEach((indexFile) => {
                validPaths.push(path.join(pathToTry, indexFile))
              })
            }

            const relativePath = path.relative(startPath, pathToTry)
            const isInExcludedFolder = config.excludedFolders?.some(
              (excludedFolder) =>
                relativePath.includes(path.normalize(excludedFolder))
            )

            if (!isInExcludedFolder) {
              if (config.debug) {
                logMessageForFunction(
                  'getAbsolutePath',
                  { isInExcludedFolder, relativePath, pathToTry },
                  'Adding to validPaths'
                )
              }
              validPaths.push(pathToTry)
              if (!absolutePath) {
                absolutePath = pathToTry
              }
            } else {
              if (config.debug) {
                logMessageForFunction(
                  'getAbsolutePath',
                  { isInExcludedFolder, relativePath, pathToTry },
                  'Not adding to validPaths'
                )
              }
            }
          }
        } catch (error) {
          if (config.debug) {
            logColoredMessage(`Error accessing path: ${pathToTry}`, 'red')
          }
        }
      }
    }

    return { paths: validPaths, absolutePath }
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    if (config.debug) {
      logFailedMessage('getAbsolutePath', error)
    }
    red(`Error accessing path: ${errorMessage}`)
    return { paths: [] }
  }
}
