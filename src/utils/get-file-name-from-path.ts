import { logColoredMessage } from './log-with-color'

export function getFilenameFromPath(
  path: string,
  debug?: boolean
): string | undefined {
  const fs = require('fs')

  if (debug) {
    logColoredMessage(`getFilenameFromPath path: ${path}`, 'yellow')
  }
  // Check if the path is a directory
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    if (debug) {
      logColoredMessage(`getFilenameFromPath ${path} is a directory`, 'yellow')
      logColoredMessage(`returning undefined`, 'yellow')
    }
    return undefined
  }

  // Split the path by either forward or backward slashes
  const parts = path.split(/[/\\]/)
  const nameOfFile = parts[parts.length - 1]

  if (debug) {
    logColoredMessage(`getFilenameFromPath nameOfFile: ${nameOfFile}`, 'yellow')
    logColoredMessage(
      `getFilenameFromPath parts: ${JSON.stringify(parts)}`,
      'yellow'
    )
  }

  let nameToReturn: string | undefined = nameOfFile

  if (nameOfFile && nameOfFile.includes('.')) {
    nameToReturn = nameOfFile.split('.')[0]
  } else {
    nameToReturn = nameOfFile || undefined
  }

  if (debug) {
    logColoredMessage(
      `getFilenameFromPath nameToReturn: ${nameToReturn}`,
      'yellow'
    )
  }

  return nameToReturn
}
