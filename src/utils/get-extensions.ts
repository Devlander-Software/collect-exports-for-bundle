import createExtensions from './create-extensions'
import { logColoredMessage } from './log-with-color'
import { parseComplexExtensions } from './parse-complex-extensions'

export const getExtensions = (
  extensions: string[],
  extensionsFilteredByWords: string[] = [],
  debug?: boolean
): string[] => {
  extensions = extensions.filter(
    (ext) => !extensionsFilteredByWords.includes(ext)
  )
  if (debug) {
    logColoredMessage(`extensions before: ${extensions}`, 'yellow')
    console.log('\n')
    console.log('\n')
  }
  const parsed = parseComplexExtensions(extensions)
  console.log('\n')
  console.log('\n')
  console.log('inside of get-extensions.ts')
  if (debug) {
    logColoredMessage(`parsed: ${JSON.stringify(parsed)}`, 'yellow')
    console.log('\n')
    console.log('\n')
  }
  let createdExtensions = createExtensions('', parsed.words, parsed.extensions)
  if (debug) {
    logColoredMessage(
      `createdExtensions: ${JSON.stringify(createdExtensions)}`,
      'yellow'
    )
    console.log('\n')
    console.log('\n')
  }

  if (extensionsFilteredByWords && extensionsFilteredByWords.length) {
    if (debug) {
      logColoredMessage(
        `extensionsFilteredByWords: ${JSON.stringify(
          extensionsFilteredByWords
        )}`,
        'yellow'
      )
      console.log('\n')
      console.log('\n')
      logColoredMessage(
        `Starting to filter created extensions by words: ${JSON.stringify(
          extensionsFilteredByWords,
          null,
          2
        )}`,
        'blue'
      )
    }
    createdExtensions = createdExtensions.filter(
      (ext: string) => !extensionsFilteredByWords.includes(ext)
    )

    if (debug) {
      logColoredMessage(
        `createdExtensions after filtering: ${JSON.stringify(
          createdExtensions
        )}`,
        'green'
      )
      console.log('\n')
      console.log('\n')
    }
  }

  return createdExtensions
}
