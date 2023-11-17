import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

export function isSnakeCase(str: string, debug?: boolean): boolean {
  if (!regexDefinitions.isSnakeCase.test(str)) {
    if (debug) {
      logColoredMessage(`${str} is not in snake_case.`, 'red')
    }
    return false
  } else {
    return true
  }
}
