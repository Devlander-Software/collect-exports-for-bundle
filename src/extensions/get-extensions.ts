import { logColoredMessage, logFailedMessage } from '../utils/log-with-color' // Importing the logging functions
import { filterExtension } from './filter-extension' // Assuming filterExtension is in the same directory

export const getExtensions = (
  extensions: string[],
  extensionsFilteredByWords: string[] = [],
  debug: boolean = false,
  forWhat: string = ''
): string[] => {
  if (debug) {
    logColoredMessage(`Getting extensions for ${forWhat}`, 'yellow')
  }

  const filteredExtensions = extensions
    .map((extension) => filterExtension(extension, extensionsFilteredByWords))
    .filter((extension) => extension !== null) as string[]

  if (debug) {
    if (filteredExtensions.length > 0) {
      logColoredMessage(
        `Filtered Extensions for ${forWhat}: ${filteredExtensions.join(', ')}`,
        'blue'
      )
    } else {
      logFailedMessage(`No extensions passed the filter for ${forWhat}`, 'red')
    }
  }

  return filteredExtensions
}
