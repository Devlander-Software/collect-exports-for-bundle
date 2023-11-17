import { isWindows } from './is-windows'
import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

export function hasDuplicateDriveLetters(
  str: string,
  debug?: boolean
): boolean {
  if (!isWindows()) {
    return false
  }

  if (regexDefinitions.containsDuplicateDriveLetters.test(str)) {
    if (debug) {
      logColoredMessage(`${str} has duplicate drive letters.`, 'red')
    }
    return true
  } else {
    return false
  }
}

export function correctDuplicateDriveLetters(path: string): string {
  if (!isWindows()) {
    return path
  }

  if (hasDuplicateDriveLetters(path)) {
    return path.replace(regexDefinitions.containsDuplicateDriveLetters, '$1')
  } else {
    return path
  }
}
