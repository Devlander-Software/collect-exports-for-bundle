import { logColoredMessage } from '../utils/log-with-color'
import { regexDefinitions } from './regex-definitions'
//   isPascalCase: /^[A-Z][a-zA-Z0-9]*$/,

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
