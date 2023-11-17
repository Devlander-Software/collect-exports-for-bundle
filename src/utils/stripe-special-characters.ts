import { regexDefinitions } from './regex-definitions'

export function stripSpecialCharacters(str: string): string {
  const { containsSpecialChar } = regexDefinitions
  return str.replace(containsSpecialChar, '')
}
