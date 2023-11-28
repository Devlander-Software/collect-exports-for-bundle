import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'

export function parseComplexExtensionFromFile(
  target: string,
  debug?: boolean
): {
  extension?: string | undefined
  fileName?: string | undefined
  folderName?: string | undefined
  baseFileName?: string | undefined
  words?: string[]
} {
  const payload: {
    extension?: string | undefined
    folderName?: string | undefined
    fileName?: string | undefined
    baseFileName?: string | undefined
    words?: string[]
  } = {
    extension: undefined,
    fileName: undefined,
    folderName: undefined,
    baseFileName: undefined,
    words: undefined
  }
  const wordSet: Set<string> = new Set()

  try {
    // Split the target string by '/' and process each part
    const pathParts = target.split('/')
    pathParts.forEach((part) => {
      // Further split each part by '.' and process
      const splitParts = part.split('.').filter(Boolean)
      splitParts.forEach((word) => wordSet.add(word))
    })

    // Check if target is a file (contains a dot) or a directory
    if (target.includes('.')) {
      const fileName = pathParts.pop() // Get the last part after the last '/'
      if (!fileName) {
        throw new Error('No file name found in the provided file path.')
      } else {
        payload.fileName = fileName

        // Match everything from the first dot to the end of the string
        const match = fileName.match(/\..*$/)
        const extension = match && match[0] ? match[0] : ''

        if (debug) {
          logColoredMessage(`Extracted Extension: ${extension}`, 'yellow')
        }

        if (extension) {
          payload.extension = extension
        }

        if (fileName.includes('.') || extension) {
          if (extension) {
            payload.baseFileName = fileName.replace(extension, '')
          } else if (fileName.includes('.')) {
            payload.baseFileName = fileName.split('.').shift()
          }
        } else {
          payload.baseFileName = fileName
        }
      }
    } else {
      // Handle directory
      if (debug) {
        logColoredMessage(`Path is a directory: ${target}`, 'yellow')
      }
      payload.folderName = pathParts.pop()
    }

    // Assign words from wordSet to the payload
    payload.words = Array.from(wordSet)
  } catch (error) {
    if (debug) {
      logFailedMessage(`Error while processing path: ${target}`, error)
    }
    return payload
  }

  return payload
}
