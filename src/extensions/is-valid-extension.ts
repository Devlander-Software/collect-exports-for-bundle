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
  return
}

export function isValidExtension(
  filePath?: string,
  allowedExtensions?: string[],
  debug?: boolean
): boolean {
  if (!allowedExtensions) {
    allowedExtensions = ['.ts', '.tsx', '.types.ts']
  }
  let isValid = false
  if (filePath && isFilePath(filePath) === false) {
    console.log(`isValidExtension: ${filePath} is not a valid file path`)
    isValid = false
  } else if (filePath && isFilePath(filePath) === true) {
    if (!allowedExtensions || !allowedExtensions.length) {
      console.log(
        `isValidExtension: ${filePath} has no allowed extensions to check against`
      )
      isValid = false
    } else {
      const { extension, fileName } = parseComplexExtensionFromPath(filePath)
      if (fileName && extension) {
        console.log(fileName, extension, 'fileName and extension')
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
          console.log(
            filePathHasCorrectExtension,
            fileName,
            'file path has correct extension'
          )
          if (debug) {
            hasFileLogger(filePath, extension, 'green')
          }

          isValid = true
        } else {
          if (debug) {
            hasFileLogger(filePath, extension, 'red')
          }
          isValid = false
        }
      } else {
        if (debug && fileName && extension) {
          hasFileLogger(filePath, extension, 'red')
        }
        isValid = false
      }
    }
  } else {
    console.log(`isValidExtension: ${filePath} is not a valid file path`)
    isValid = false
  }
  if (filePath && allowedExtensions) {
    logExtensionFromExtensions(
      filePath,
      allowedExtensions,
      isValid,
      'Allowed extensions:'
    )
  }

  return isValid
}
