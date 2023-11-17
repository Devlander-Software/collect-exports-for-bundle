import * as fs from 'fs/promises' // Use the promise version of the fs module
import path from 'path'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'
import { correctDuplicateDriveLetters } from './correct-duplicate-drive-letters'
import { fileHasValidExtension } from './has-valid-extension'
import { logColoredMessage, logFailedMessage } from './log-with-color'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'
import { ResultItemType, pushToResults } from './push-to-results'

// /**
//  * Resolves the absolute path from a given start path, handling potential path issues.
//  */

export const getAbsolutePath = async (
  startPath: string,
  config: { debug?: boolean }
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

    if (config.debug) {
      logColoredMessage(
        `Here are paths to try: ${JSON.stringify(pathsToTry)}`,
        'yellow'
      )
    }

    const paths: string[] = []
    let currentIndex = 0

    while (currentIndex < pathsToTry.length) {
      const pathToTry = pathsToTry[currentIndex]

      if (config.debug) {
        logColoredMessage(`Checking path: ${pathToTry} \n`, 'magenta')
      }

      try {
        const stat = await fs.lstat(pathToTry)

        if (stat.isDirectory()) {
          if (config.debug) {
            logColoredMessage(`Found directory at ${pathToTry}`, 'blue')
            logColoredMessage(`Which is index ${currentIndex}`, 'blue')
          }
          return { absolutePath: pathToTry, paths: pathsToTry }
        } else {
          paths.push(pathToTry)
          if (config.debug) {
            logColoredMessage(
              `Did not find directory for ${pathToTry}`,
              'yellow'
            )
            logColoredMessage(`Which is index ${currentIndex}`, 'yellow')
          }
        }
      } catch (error) {
        paths.push(pathToTry)
        if (config.debug) {
          logColoredMessage(`Error accessing path: ${pathToTry}`, 'red')
        }
      }

      currentIndex++
    }

    return { paths } // Return the list of paths if no directory is found
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    if (config.debug === true) {
      logFailedMessage('getAbsolutePath', error)
    }
    console.error(`Error accessing path: ${errorMessage}`)

    return { paths: [] }
  }
}

export const getCachedDirectory = async (
  filename: string
): Promise<boolean> => {
  try {
    const result = (await fs.lstat(filename)).isDirectory()
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error accessing file/folder "${filename}":`, error.message)
    }

    return false
  }
}

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
    const filename = path.join(directoryPath, file)
    const isDirectory = (await fs.lstat(filename)).isDirectory()

    if (isDirectory) {
      if (config.excludedFolders && config.excludedFolders.includes(file)) {
        continue
      }
      paths = paths.concat(await collectPaths(filename, config))
    } else {
      if (['index.ts', 'index.tsx'].includes(file)) {
        continue
      }
      const fileName = parseComplexExtensionFromPath(filename)
      const validFile = fileHasValidExtension(fileName, config)

      if (!validFile) {
        continue
      }
      paths.push(filename)
    }
  }

  return paths
}

/**
 * Recursively collects paths from the specified starting path based on the given configuration.
 */

// collectPaths function
export async function collectPaths(
  startPath: string,
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): Promise<string[]> {
  // Initialization of config.results...

  const resultFromGetAbsolutePath = await getAbsolutePath(startPath, {
    debug: config.debug
  })
  let paths = resultFromGetAbsolutePath.paths
  const absolutePath = resultFromGetAbsolutePath.absolutePath ?? ''

  // Logging...

  if (!absolutePath) {
    return paths
  }

  try {
    const files = await fs.readdir(absolutePath)
    for (const file of files) {
      const filename = path.join(absolutePath, file)

      // Logging...
      const isDirectory = await getCachedDirectory(filename)

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
        }
        if (config.results) {
          config.results = pushToResults(
            config.results,
            ResultItemType.IncludedFolder,
            { nameOrPath: filename, reason: ['Directory is included'] }
          )
        }
        paths = paths.concat(await collectPaths(filename, config))
      } else {
        if (['index.ts', 'index.tsx'].includes(file)) {
          continue
        }
        const fileName = parseComplexExtensionFromPath(filename)
        const validFile = fileHasValidExtension(fileName, config)

        if (!validFile) {
          continue
        }
        paths.push(filename)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      logFailedMessage('collectPaths', error)
    }
    // Error handling...
  }

  return paths
}
