import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

export function isPascalCase(str: string, debug?: boolean): boolean {
  if (!regexDefinitions.isPascalCase.test(str)) {
    if (debug) {
      logColoredMessage(`${str} is not in PascalCase.`, 'red')
    }
    return false
  } else {
    return true
  }
}
