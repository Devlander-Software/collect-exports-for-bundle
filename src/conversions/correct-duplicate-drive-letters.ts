import { isWindows } from '../constraints/is-windows'
import { logColoredMessage } from '../utils/log-with-color'

export function correctDuplicateDriveLetters(path: string): string {
  const isTestEnvironment = process.env.NODE_ENV === 'test'

  if (!isWindows() && !isTestEnvironment) {
    return path
  }

  // Regular expression to match duplicated drive letters
  const duplicatedDriveLetterPattern = /^([a-z]:\\)([a-z]:\\)/i

  if (duplicatedDriveLetterPattern.test(path)) {
    // Replace the duplicated drive letter with a single instance
    const correctedPath = path.replace(duplicatedDriveLetterPattern, '$1')

    if (isTestEnvironment) {
      logColoredMessage(`Corrected path: ${correctedPath}`, 'green')
    }
    return correctedPath
  }

  return path // Return the original path if no duplicates are found
}
