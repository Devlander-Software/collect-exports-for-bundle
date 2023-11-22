import * as fs from 'fs/promises'
import path from 'path'
import { correctDuplicateDriveLetters } from '../../conversions/correct-duplicate-drive-letters'
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
    allowedExtensions: string[]
    ignoredExtensions?: string[]
  }
): Promise<{ paths: string[]; absolutePath?: string }> => {
  try {
    let myPath = path.normalize(path.resolve(startPath))
    logColoredMessage(`Starting to get absolute path from ${myPath}`, 'blue')
    myPath = correctDuplicateDriveLetters(myPath)
    logColoredMessage(`Corrected path to ${myPath}`, 'blue')

    const pathsToTry = [
      path.normalize(path.resolve(startPath)),
      correctDuplicateDriveLetters(path.normalize(path.resolve(startPath))),
      `./${startPath}/`,
      `${startPath}/`
    ]

    logMessageForFunction('getAbsolutePath', { pathsToTry, config })

    const validPaths = []
    let absolutePath

    for (const pathToTry of pathsToTry) {
      if (config.debug) {
        logColoredMessage(`Checking path: ${pathToTry}`, 'magenta')
      }

      try {
        const stat = await fs.lstat(pathToTry)
        if (stat.isDirectory()) {
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

    return { paths: validPaths, absolutePath }
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    if (config.debug) {
      logFailedMessage('getAbsolutePath', error)
    }
    console.error(`Error accessing path: ${errorMessage}`)
    return { paths: [] }
  }
}
