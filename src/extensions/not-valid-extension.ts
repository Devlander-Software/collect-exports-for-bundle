import { isFilePath } from '../constraints/is-file-path'
import { logExtensionFromExtensions } from '../utils/log-extension-from-extensions'
import { logMessageForFunction } from '../utils/log-with-color'
import { hasFileLogger } from './is-valid-extension'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'

export function notValidExtension(
  filePath: string,
  ignoredExtensions: string[],
  debug?: boolean
): boolean {
  let isIgnoredExtension = false
  let extension = undefined
  let fileName = undefined

  if (isFilePath(filePath)) {
    const parsedExtension = parseComplexExtensionFromPath(filePath)
    if (typeof parsedExtension !== 'undefined') {
      if (typeof parsedExtension.extension !== 'undefined') {
        extension = parsedExtension.extension
      }
      if (typeof parsedExtension.fileName !== 'undefined') {
        fileName = parsedExtension.fileName
      }

      if (typeof extension !== 'undefined' && fileName !== 'undefined') {
        isIgnoredExtension = ignoredExtensions.includes(extension)

        if (debug) {
          const logColor = isIgnoredExtension ? 'red' : 'green'
          hasFileLogger(filePath, extension, logColor)
        }
      }
    }
  }
  if (debug) {
    logMessageForFunction('notValidExtension', {
      filePath,
      ignoredExtensions,
      isIgnoredExtension,
      additionalInfo: 'Some additional debug info if needed'
    })

    logExtensionFromExtensions(
      filePath,
      ignoredExtensions,
      isIgnoredExtension,
      'Ignored extensions:'
    )
  }
  return isIgnoredExtension
}
