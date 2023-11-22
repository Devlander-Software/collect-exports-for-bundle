import { isCamelCase } from '../constraints/is-camel-case'
import { regexDefinitions } from '../constraints/regex-definitions'

export function toCamelCase(str: string): string {
  // replace any special characters with a space

  if (isCamelCase(str)) {
    return str // Return the string as-is if it's already in camelCase
  }

  console.log(str, 'str before')
  if (regexDefinitions.containsSpecialChar.test(str)) {
    str = str.replace(regexDefinitions.containsSpecialChar, '_')
  }

  console.log(str, 'str before')
  if (regexDefinitions.containsDash.test(str)) {
    str = str.replace(regexDefinitions.containsDash, '_')
  }

  str = str.trim()
  if (!str) {
    return str // Return empty string if input is empty
  }

  // Replace special characters with a space

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
