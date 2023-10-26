import { ModuleExportOptions, TColorValue } from '../types/types'
import { getFilenameFromPath } from './get-file-name-from-path'
import { logColoredMessage } from './log-with-color'

const hasFileLogger = (fileName: string, ext: string, color: TColorValue) => {
  console.log(`${fileName} ends with`)
  logColoredMessage(`${ext}`, color)
  logColoredMessage(
    `${color === 'red' ? 'Exluding' : 'Including'} file: ${fileName}`,
    color
  )
  console.log('\n')
}

function notValidExtension(
  filePath: string,
  ignoredExtensions: string[]
): boolean {
  for (const ext of ignoredExtensions) {
    const endsWithExtension = filePath.endsWith(ext)

    if (endsWithExtension) {
      hasFileLogger(filePath, ext, 'red')
      return true
    }
  }
  return false
}

function isValidExtension(
  filePath: string,
  allowedExtensions: string[]
): boolean {
  for (const ext of allowedExtensions) {
    const endsWithExtension = filePath.endsWith(ext)

    if (endsWithExtension) {
      hasFileLogger(filePath, ext, 'green')

      return true
    }
  }
  return false
}

export function fileHasValidExtension(
  filePath: string,
  config: ModuleExportOptions
): boolean {
  const ignoredExtensions = config.ignoredExtensions || []
  const allowedExtensions = config.allowedExtensions || []
  const specificFiles = config.specificFiles || []
  const nameOfFile = getFilenameFromPath(filePath)

  if (specificFiles.length > 0) {
    if (specificFiles.includes(nameOfFile)) {
      return true
    } else {
      return false
    }
  } else if (notValidExtension(nameOfFile, ignoredExtensions)) {
    return false
  } else {
    return isValidExtension(nameOfFile, allowedExtensions)
  }
}
