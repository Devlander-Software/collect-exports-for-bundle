import { createExtensions } from './create-extensions'
import { logColoredMessage, logFailedMessage } from './log-with-color'
import { parseComplexExtensions } from './parse-complex-extensions'

export const getExtensions = (
  extensions: string[],
  extensionsFilteredByWords: string[] = [],
  debug?: boolean,
  forWhat?: string
): string[] => {
  try {
    if (debug && forWhat) {
      logColoredMessage(
        `Running getExtensions function for ${forWhat}`,
        'yellow'
      )
      console.log('\n')
      console.log('\n')
    }
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
    if (debug) {
      logColoredMessage(`parsed: ${JSON.stringify(parsed)}`, 'yellow')
      console.log('\n')
      console.log('\n')
    }
    let createdExtensions = createExtensions(
      '',
      parsed.words,
      parsed.extensions
    )
    if (debug) {
      logColoredMessage(
        `createdExtensions: ${JSON.stringify(createdExtensions)} ${
          forWhat ? `FOR: ${forWhat}` : ''
        }`,
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
          )}
          ${forWhat ? `FOR: ${forWhat}` : ''}
        
        `,
          'yellow'
        )
        console.log('\n')
        console.log('\n')
        logColoredMessage(
          `Starting to filter created extensions by words: ${JSON.stringify(
            extensionsFilteredByWords,
            null,
            2
          )}
          ${forWhat ? `FOR: ${forWhat}` : ''}
        
        `,
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
          )}
        ${forWhat ? `FOR: ${forWhat}` : ''}
        `,
          'green'
        )
        console.log('\n')
        console.log('\n')
      }
    }

    if (debug && forWhat) {
      logColoredMessage(
        `Finished running getExtensions for ${forWhat}`,
        'green'
      )
      console.log('\n')
      console.log('\n')
    }

    return createdExtensions
  } catch (e) {
    logFailedMessage('getExtensions', e)

    return []
  }
}
