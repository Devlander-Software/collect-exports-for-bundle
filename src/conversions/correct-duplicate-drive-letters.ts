import { isWindows } from '../constraints/is-windows'
import { regexDefinitions } from '../constraints/regex-definitions'
import { logColoredMessage } from '../utils/log-with-color'

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
  const isTestEnvironment = process.env.NODE_ENV === 'test'

  if (!isWindows() && !isTestEnvironment) {
    return path
  }

  // Corrected regular expression for matching drive letters
  const driveLetterPattern = /^[a-z]:/i

  const match = path.match(driveLetterPattern)
  if (match) {
    let driveLetter = ''
    let correctedPath = ''
    if (match[0] && typeof match[0] === 'string') {
      driveLetter = match[0].toUpperCase() // Convert to uppercase
      correctedPath = path.replace(driveLetterPattern, `${driveLetter}`)
    }

    if (hasDuplicateDriveLetters(correctedPath)) {
      if (isTestEnvironment) {
        throw new Error(
          `Path "${correctedPath}" still has duplicate drive letters.`
        )
      } else {
        // Handle the case where you want to deal with it in a non-test environment.
        // You can log an error message or handle it as appropriate for your application.
      }
    }

    return correctedPath
  }

  return path // No drive letter found, return the original path
}
