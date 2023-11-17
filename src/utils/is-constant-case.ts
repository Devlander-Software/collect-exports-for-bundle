import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

export function isConstantCase(str: string, debug?: boolean): boolean {
  if (!regexDefinitions.isConstantCase.test(str)) {
    if (debug) {
      logColoredMessage(`${str} is not in CONSTANT_CASE.`, 'red')
    }
    return false
  } else {
    return true
  }
}
