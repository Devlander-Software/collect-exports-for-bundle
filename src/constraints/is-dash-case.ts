import { logColoredMessage } from '../utils/log-with-color'
import { regexDefinitions } from './regex-definitions'

export function isDashCase(str: string, debug?: boolean): boolean {
  if (!regexDefinitions.isDashCase.test(str)) {
    if (debug) {
      logColoredMessage(`${str} is not in dash-case (kebab-case).`, 'red')
    }
    return false
  } else {
    return true
  }
}
