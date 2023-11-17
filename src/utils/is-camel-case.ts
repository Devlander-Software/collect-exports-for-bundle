import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

export function isCamelCase(str: string, debug?: boolean): boolean {
  regexDefinitions

  if (
    !regexDefinitions.isCamelCase.test(str) ||
    regexDefinitions.containsUnderscore.test(str) ||
    regexDefinitions.isDashCase.test(str) ||
    regexDefinitions.containsSpecialChar.test(str)
  ) {
    if (debug) {
      logColoredMessage(`${str} is not in camelCase.`, 'red')
    }
    return false
  } else {
    return true
  }
}
