import { logColoredMessage } from './log-with-color'

type ParsedExtensionsResult = {
  words: string[]
  extensions: string[]
}

export function parseComplexExtensions(
  extensions: string[],
  debug?: boolean
): ParsedExtensionsResult {
  const wordSet: Set<string> = new Set()
  const extensionSet: Set<string> = new Set()

  extensions.forEach((fullExtension) => {
    const parts = fullExtension.split('.').filter(Boolean) // Split and remove any empty strings
    if (debug) {
      logColoredMessage(`parts: ${JSON.stringify(parts)}`, 'yellow')
      console.log('\n')
      console.log('\n')
    }
    const extension = `.${parts.pop()}` // The last part is the extension
    if (debug) {
      logColoredMessage(`extension: ${JSON.stringify(extension)}`, 'yellow')
      console.log('\n')
      console.log('\n')
    }
    extensionSet.add(extension) // Add the extension part, including the dot

    // The rest are words
    parts.forEach((part) => wordSet.add(part))
  })

  // Convert the Sets to Arrays before returning
  return {
    words: Array.from(wordSet),
    extensions: Array.from(extensionSet)
  }
}
