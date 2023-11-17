import { isCamelCase } from './is-camel-case'
import { stripSpecialCharacters } from './stripe-special-characters'

export function toCamelCase(str: string): string {
  if (isCamelCase(str)) {
    return str // Return the string as-is if it's already in camelCase
  }

  str = str.trim()
  if (!str) {
    return str // Return empty string if input is empty
  }

  // Replace special characters with a space
  str = stripSpecialCharacters(str)

  // Function to capitalize the first letter of a word
  const capitalize = (word: string): string =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

  // Split the string by non-alphanumeric characters (like spaces, dashes, underscores)
  const parts = str.split(/[-_ ]+/)

  // Convert the first part to lowercase, capitalize the subsequent parts, and join them
  return parts
    .map((part, index) => (index === 0 ? part.toLowerCase() : capitalize(part)))
    .join('')
}
