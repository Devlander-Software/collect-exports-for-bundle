import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'

interface ParseComplexExtensionFromFileResult {
  (
    target: string,
    options: {
      debug?: boolean
      forceIsFilePath?: boolean
      forceIsDirectory?: boolean
    }
  ): {
    extension?: string
    fileName?: string
    folderName?: string
    baseFileName?: string
    originalValue: string

    words?: string[]
  }
}

export const parseComplexExtensionFromFile: ParseComplexExtensionFromFileResult =
  (
    target: string,
    options?: {
      debug?: boolean
      forceIsFilePath?: boolean
    }
  ) => {
    let debug = false
    let forceIsFilePath = false

    if (options) {
      debug = options.debug ?? false
      forceIsFilePath = options.forceIsFilePath ?? false
    }

    let payload: {
      extension?: string | undefined
      folderName?: string | undefined
      fileName?: string | undefined
      originalValue: string

      baseFileName?: string | undefined
      words?: string[]
    } = {
      extension: undefined,
      fileName: undefined,
      folderName: undefined,
      baseFileName: undefined,
      originalValue: target,
      words: undefined
    }
    const wordSet: Set<string> = new Set()

    try {
      const handleParsing = (
        fileName: string
      ): {
        extension?: string | undefined
        fileName?: string | undefined
        folderName?: string | undefined
        originalValue: string

        baseFileName?: string | undefined
        words?: string[]
      } => {
        // Check if target is a file (contains a dot) or a directory

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

        payload.words = Array.from(wordSet)

        return payload
      }
      // Split the target string by '/' and process each part
      const pathParts = target.split('/')
      pathParts.forEach((part) => {
        // Further split each part by '.' and process
        const splitParts = part.split('.').filter(Boolean)
        splitParts.forEach((word) => wordSet.add(word))
      })

      // Assign words from wordSet to the payload

      // Check if target is a file (contains a dot) or a directory
      if (target.includes('.') && !forceIsFilePath) {
        const fileName = pathParts.pop() // Get the last part after the last '/'
        if (fileName) {
          payload = handleParsing(fileName)
        }
      } else if (forceIsFilePath) {
        const fileName = target.includes('/') ? target.split('/').pop() : target
        if (fileName) {
          payload = handleParsing(fileName)
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
