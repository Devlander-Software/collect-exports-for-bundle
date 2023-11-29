import { red } from 'picocolors'
import { isFilePath } from '../constraints/is-file-path'
import { TColorValue } from '../types/t-color.types'
import { logExtensionFromExtensions } from '../utils/log-extension-from-extensions'
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
}

export function isValidExtension(
  filePath?: string,
  allowedExtensions: string[] = ['.ts', '.tsx', '.types.ts'],
  debug?: boolean
): boolean {
  if (!filePath || !isFilePath(filePath) || filePath === '') {
    red(`isValidExtension: ${filePath} is not a valid file path`)
    logExtensionFromExtensions(
      filePath ? filePath : 'No file path provided',
      allowedExtensions,
      false,
      'Allowed extensions:'
    )
    return false
  }

  const parsedExtension = parseComplexExtensionFromPath(filePath)
  if (!parsedExtension.fileName || !parsedExtension.extension) {
    logExtensionFromExtensions(
      filePath,
      allowedExtensions,
      false,
      'Allowed extensions:'
    )
    return false
  }

  const { fileName, extension } = parsedExtension
  const filePathHasCorrectExtension =
    filePath.includes(extension) && allowedExtensions.includes(extension)

  if (debug) {
    logMessageForFunction('isValidExtension', {
      filePath,
      allowedExtensions,
      fileName,
      extension,
      filePathHasCorrectExtension
    })
  }

  const isValid = filePathHasCorrectExtension
  if (isValid && debug) {
    hasFileLogger(filePath, extension, 'green')
  } else if (!isValid && debug) {
    hasFileLogger(filePath, extension, 'red')
  }

  // Logging the extensions regardless of the validity of the filePath
  logExtensionFromExtensions(
    filePath,
    allowedExtensions,
    isValid,
    'Allowed extensions:'
  )

  return isValid
}
