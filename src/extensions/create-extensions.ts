import { logColoredMessage, logFailedMessage } from '../utils/log-with-color'
import { simulateProgressBar } from '../utils/stimulate-progress-bar'
import { createExtension } from './create-extension'

export interface CreateExtensions {
  (
    word: string,
    wordList?: string[],
    fileExtensions?: string[],
    debug?: boolean
  ): string[]
}

export const createExtensions: CreateExtensions = (
  word: string = '',
  wordList: string[] = [],
  fileExtensions: string[] = [],
  debug?: boolean
): string[] => {
  try {
    if (!word || word === ' ') {
      word = ''
    } else {
      word = word.trim()
    }
    const dev = process.env.NODE_ENV === 'development'
    if (debug || dev) {
      logColoredMessage(`Creating extensions for ${word}...`, 'yellow')
    }
    if (!fileExtensions.length) {
      return []
    }
    const combinedExtensions: Set<string> = new Set()

    const totalSteps =
      wordList.length * fileExtensions.length + fileExtensions.length
    let currentStep = 0

    const updateProgress = (): void => {
      simulateProgressBar(
        'Creating extensions progress',
        totalSteps,
        ++currentStep
      )
    }

    // Begin processing
    fileExtensions.forEach((fileExtension) => {
      combinedExtensions.add(createExtension(word, '', fileExtension))
      if (debug || dev) {
        updateProgress() // Update progress each time an extension is created
      }
    })

    wordList.forEach((additionalWord) => {
      fileExtensions.forEach((fileExtension) => {
        const createdExtension = createExtension(
          word,
          additionalWord,
          fileExtension
        )
        combinedExtensions.add(createdExtension)
        if (debug || dev) {
          updateProgress() // Update progress each time an extension is created
        }

        if (additionalWord) {
          const invertedExtension = createExtension(
            additionalWord,
            word,
            fileExtension
          )
          combinedExtensions.add(invertedExtension)
          if (debug || dev) {
            updateProgress() // Update progress also for the inverted extension
          }
        }
      })
    })

    if (debug || dev) {
      logColoredMessage(
        `Finished creating extensions for ${word}: ${Array.from(
          combinedExtensions
        ).join(', ')}`,
        'green'
      )
    }

    return Array.from(combinedExtensions)
  } catch (error) {
    // Handle or log the error
    if (debug) {
      logFailedMessage('createExtensions', error)
    }

    return [] // Uncomment if you want to return a default value
  }
}
