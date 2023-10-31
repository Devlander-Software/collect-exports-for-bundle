import { logColoredMessage } from './log-with-color'

export function isCamelCase(str: string): boolean {
  // Checking if the string is in camelCase
  const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/

  if (!camelCaseRegex.test(str)) {
    logColoredMessage(`${str} is not in camelCase.`, 'red')
    return false
  } else {
    return true
  }
}
