import fs from 'fs' // Assuming Node.js environment
import { getFileNameFromExtension } from './get-file-name-from-extension'
import { logColoredMessage, logFailedMessage } from './log-with-color'

export function getFilenameFromPath(
  path: string,
  removeComplexExtension?: boolean,
  debug?: boolean
): string | undefined {
  try {
    if (debug) {
      logColoredMessage(`getFilenameFromPath path: ${path}`, 'yellow')
    }

    // Check if the path is a directory
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      if (debug) {
        logColoredMessage(
          `getFilenameFromPath ${path} is a directory`,
          'yellow'
        )
        logColoredMessage(`returning undefined`, 'yellow')
      }
      return undefined
    }

    const parts = path.split(/[/\\]/) // Split the path by either forward or backward slashes
    let fileName = parts.pop() // Extract the filename part

    if (!fileName) {
      return undefined // Return undefined if fileName is empty or undefined
    }

    if (debug) {
      logColoredMessage(`getFilenameFromPath fileName: ${fileName}`, 'yellow')
    }

    fileName = getFileNameFromExtension(fileName, removeComplexExtension)

    if (debug) {
      logColoredMessage(`getFilenameFromPath return: ${fileName}`, 'yellow')
    }

    return fileName
  } catch (err) {
    logFailedMessage(`getFilenameFromPath`, err)
    console.error(err)
    return undefined
  }
}
