import { logColoredMessage } from './log-with-color'
import { simulateProgressBar } from './stimulate-progress-bar'

export interface CreateExtensions {
  (
    word: string,
    wordList?: string[],
    fileExtensions?: string[],
    debug?: boolean
  ): string[]
}

export const createExtensions: CreateExtensions = (
  word: string = ' ',
  wordList: string[] = [],
  fileExtensions: string[] = [],
  debug?: boolean
): string[] => {
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
  const currentStep = 0

  const updateProgress = (): void => {
    simulateProgressBar('Creating extensions progress', totalSteps, currentStep)
  }

  // Helper function to check if the string has a leading dot and add one if not
  const ensureLeadingDot = (str: string): string =>
    str.startsWith('.') ? str : `.${str}`

  // Helper function to create extension with correct dots in place
  const createExtension = (
    mainWord: string,
    additionalWord: string,
    fileExt: string
  ): string => {
    mainWord = mainWord ? ensureLeadingDot(mainWord) : ''
    additionalWord = additionalWord ? ensureLeadingDot(additionalWord) : ''
    fileExt = ensureLeadingDot(fileExt)
    return `${mainWord}${additionalWord}${fileExt}`
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

  // Convert the Set to an Array before returning
  return Array.from(combinedExtensions)
}

export default createExtensions
