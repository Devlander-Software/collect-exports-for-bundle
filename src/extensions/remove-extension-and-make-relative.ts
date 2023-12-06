// import * as path from 'path'
// import {
//   logFailedMessage,
//   logMessageForFunction
// } from '../utils/log-with-color'

// /**
//  * Converts a filepath to a relative path and removes its file extension.
//  * @param filepath - The full file path.
//  * @param rootDir - The root directory to make the path relative to.
//  * @returns The relative file path without the extension.
//  */
// export function removeExtensionAndMakeRelative(
//   filepath: string,
//   rootDir: string,
//   debug?: boolean
// ): string {
//   try {
//     // if the file path is ./TestComp/index
//     // then we want to return /TestComp

//     let valueToReturn = ''
//     const relativePath = `./${path
//       .relative(rootDir, filepath)
//       .replace(/\\/g, '/')}`

//     if (debug) {
//       logMessageForFunction('removeExtensionAndMakeRelative', {
//         filepath,
//         rootDir,
//         relativePath
//       })
//     }
//     const lastDotIndex = relativePath.lastIndexOf('.')
//     if (debug) {
//       logMessageForFunction('removeExtensionAndMakeRelative', {
//         lastDotIndex
//       })
//     }
//     if (lastDotIndex === -1) {
//       valueToReturn = relativePath
//     } else {
//       valueToReturn = relativePath.substring(0, lastDotIndex)
//     }

//     if (debug) {
//       logMessageForFunction('removeExtensionAndMakeRelative', {
//         valueToReturn
//       })
//     }
//     return valueToReturn
//   } catch (error) {
//     console.log(error)
//     logFailedMessage(
//       `Error while removing extension and making path relative: ${filepath}`,
//       error
//     )
//     return ''
//   }
// }
import * as path from 'path'
import {
  logFailedMessage,
  logMessageForFunction
} from '../utils/log-with-color'

/**
 * Converts a filepath to a relative path and removes its file extension.
 * If the file is an 'index' file, it returns the directory path without '/index'.
 * @param filepath - The full file path.
 * @param rootDir - The root directory to make the path relative to.
 * @returns The relative file path without the extension.
 */
export function removeExtensionAndMakeRelative(
  filepath: string,
  rootDir: string,
  debug?: boolean
): string {
  try {
    let valueToReturn = ''
    const relativePath = `./${path
      .relative(rootDir, filepath)
      .replace(/\\/g, '/')}`

    if (debug) {
      logMessageForFunction('removeExtensionAndMakeRelative', {
        filepath,
        rootDir,
        relativePath
      })
    }

    const lastSlashIndex = relativePath.lastIndexOf('/')
    const fileName = relativePath.substring(lastSlashIndex + 1)
    const isIndexFile = fileName.startsWith('index.')

    if (isIndexFile) {
      valueToReturn = relativePath.substring(0, lastSlashIndex)
    } else {
      const lastDotIndex = relativePath.lastIndexOf('.')
      if (lastDotIndex === -1) {
        valueToReturn = relativePath
      } else {
        valueToReturn = relativePath.substring(0, lastDotIndex)
      }
    }

    if (debug) {
      logMessageForFunction('removeExtensionAndMakeRelative', {
        valueToReturn
      })
    }
    return valueToReturn
  } catch (error) {
    console.log(error)
    logFailedMessage(
      `Error while removing extension and making path relative: ${filepath}`,
      error
    )
    return ''
  }
}
