import { logColoredMessage } from './log-with-color'

export function parseComplexExtensionFromPath(
  filePath: string,
  debug?: boolean
): string {
  const fileName = filePath.split('/').pop() // Get the last part after the last '/'
  if (!fileName) {
    throw new Error('No file name found in the provided file path.')
  }

  // Match everything from the first dot to the end of the string
  const match = fileName.match(/\..*$/)
  const extension = match ? match[0] : ''

  if (debug) {
    logColoredMessage(`File Path: ${filePath}`, 'yellow')
    logColoredMessage(`Extracted Extension: ${extension}`, 'yellow')
  }

  return extension
}
