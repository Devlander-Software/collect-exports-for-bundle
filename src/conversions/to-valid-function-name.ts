import { isCamelCase } from '../constraints/is-camel-case'
import { logColoredMessage } from '../utils/log-with-color'

export function toValidFunctionName(
  word: string,
  usedNames: string[] = []
): string {
  // If word has a dot, try to use the prefix first
  if (word.includes('.')) {
    const [prefix] = word.split('.')
    if (!usedNames.includes(prefix)) {
      return prefix
    }
    word = word.replace('.', '_')
  }

  // Convert underscores and dashes to spaces for camelCasing
  word = word.replace(/[_-]/g, ' ')

  // Convert first word to lowercase and the rest of words to title case (for camelCasing)
  word = word.toLowerCase().replace(/( [a-z])/g, (match) => match.toUpperCase())

  // Remove spaces
  word = word.replace(/ /g, '')

  // Ensure the result starts with a lowercase letter
  if (/^[A-Z]/.test(word)) {
    word = word[0].toLowerCase() + word.substr(1)
  }

  // Ensure it's not a duplicate
  let validName = word
  let counter = 1
  while (usedNames.includes(validName)) {
    validName = `${word}${counter}`
    counter++
  }

  if (!isCamelCase(validName)) {
    logColoredMessage(`${validName} should be in camelCase but isn't.`, 'red')
  }

  return validName
}
