import fs from 'fs'
import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'

export function parseComplexExtensionFromPath(
  filePath: string,
  debug?: boolean
): {
  extension?: string
  fileName?: string
  folderName?: string
} {
  const payload: {
    extension?: string
    folderName?: string
    fileName?: string
  } = {
    extension: undefined,
    fileName: undefined,
    folderName: undefined
  }

  if (debug) {
    logColoredMessage(`Checking Path: ${filePath}`, 'yellow')
  }

  try {
    const stats = fs.lstatSync(filePath)
    if (!stats.isDirectory()) {
      const fileName = filePath.split('/').pop() // Get the last part after the last '/'
      if (!fileName) {
        throw new Error('No file name found in the provided file path.')
      } else {
        payload.fileName = fileName

        // Match everything from the first dot to the end of the string
        const match = fileName.match(/\..*$/)
        const extension = match ? match[0] : ''

        if (debug) {
          logColoredMessage(`Extracted Extension: ${extension}`, 'yellow')
        }

        if (extension) {
          payload.extension = extension
        }
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
