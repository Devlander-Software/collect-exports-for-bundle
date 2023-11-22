import { TColorValue } from '../types/t-color.types'
import {
  logColoredMessage,
  logMessageForFunction
} from '../utils/log-with-color'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'
export const hasFileLogger = (
  fileName: string,
  ext: string,
  color: TColorValue
): void => {
  logColoredMessage(
    `${
      color === 'red' ? 'Excluding' : 'Including'
    } file: ${fileName} with fileExtension: ${ext}`,
    color
  )
  console.log('\n')
  return
}

export function isValidExtension(
  filePath?: string,
  allowedExtensions?: string[],
  debug?: boolean
): boolean {
  if (!filePath) {
    return false
  }

  if (!allowedExtensions || !allowedExtensions.length) {
    return false
  }
  const { extension, fileName } = parseComplexExtensionFromPath(filePath)
  if (fileName && extension) {
    const filePathHasCorrectExtension =
      filePath.includes(extension) && allowedExtensions.includes(extension)

    if (debug) {
      logMessageForFunction('isValidExtension', {
        filePath,
        allowedExtensions,
        extension,
        fileName,
        filePathHasCorrectExtension
      })
    }

    if (filePathHasCorrectExtension) {
      if (debug) {
        hasFileLogger(filePath, extension, 'green')
      }
      return true
    }
  }
  return false
}
