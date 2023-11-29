import { bgBlack, bold, green, red, white } from 'picocolors'
import { isFilePath } from '../constraints/is-file-path'
import { parseComplexExtensionFromPath } from '../extensions/parse-complex-extension-from-path'
import { logFailedMessage } from './log-with-color'

export const logExtensionFromExtensions = (
  filePath: string,
  extensions: string[],
  condition: boolean,
  message?: string
): void => {
  if (!message) {
    message = 'Existing extensions:'
  }

  if (filePath === '') {
    return
  }

  if (!isFilePath(filePath)) {
    logFailedMessage(
      'logExtensionFromExtensions',
      `${filePath} is not a valid file path`
    )
  }

  const parsedExtension = parseComplexExtensionFromPath(filePath)
  if (!parsedExtension || typeof parsedExtension.extension === 'undefined') {
    red(`logExtensionFromExtensions: ${filePath} has no valid extension`)
  } else if (
    parsedExtension &&
    typeof parsedExtension.extension !== 'undefined'
  ) {
    const { extension } = parsedExtension

    bgBlack(
      `${white(bold(`@${message}` || '@'))}
      ${extensions
        .map((ext) =>
          ext === extension ? (condition ? green(ext) : red(ext)) : ext
        )
        .join(', ')}
      `
    )
  } else {
    red(`logExtensionFromExtensions: ${filePath} has no valid extension`)
  }
}
