import fs from 'fs'
import { isFilePath } from '../constraints/is-file-path'
import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'
import { parseComplexExtensionFromFile } from './parse-complex-extension-from-file'

export function parseComplexExtensionFromPath(
  filePath: string,
  debug?: boolean
): {
  extension?: string | undefined
  fileName?: string | undefined
  folderName?: string | undefined
  baseFileName?: string | undefined
  originalValue: string
} {
  let payload: {
    extension?: string | undefined
    folderName?: string | undefined
    originalValue: string

    fileName?: string | undefined
    words?: string[]
    baseFileName?: string | undefined
  } = {
    extension: undefined,
    fileName: undefined,
    folderName: undefined,
    originalValue: filePath,
    baseFileName: undefined,
    words: undefined
  }

  if (debug) {
    logColoredMessage(`Checking Path: ${filePath}`, 'yellow')
  }

  try {
    if (isFilePath(filePath) === false) {
      throw new Error('Provided path is not a file path.')
    }
    const stats = fs.lstatSync(filePath)
    if (!stats.isDirectory()) {
      const fileName = filePath.split('/').pop() // Get the last part after the last '/'
      if (!fileName) {
        throw new Error('No file name found in the provided file path.')
      } else {
        payload = parseComplexExtensionFromFile(fileName, {
          debug,
          forceIsFilePath: true
        })
      }
    } else {
      if (debug) {
        logColoredMessage(`Path is a directory: ${filePath}`, 'yellow')
      }
      payload.folderName = filePath.split('/').pop()
    }
  } catch (error) {
    if (debug) {
      logFailedMessage(`Error while processing path: ${filePath}`, error)
    }
    return payload
  }

  return payload
}
