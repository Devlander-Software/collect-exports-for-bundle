import { bgBlack, bold, green, red, white } from 'picocolors'
import { isFilePath } from '../constraints/is-file-path'
import { parseComplexExtensionFromPath } from '../extensions/parse-complex-extension-from-path'

export const logExtensionFromExtensions = (
  filePath: string,
  extensions: string[],
  condition: boolean,
  message?: string
): void => {
  if (!message) {
    message = 'Existing extensions:'
  }
  if (!isFilePath(filePath)) {
    throw new Error(
      `logExtensionFromExtensions: ${filePath} is not a valid file path`
    )
  }

  const parsedExtension = parseComplexExtensionFromPath(filePath)
  if (
    !parsedExtension.extension ||
    !parsedExtension ||
    typeof parsedExtension.extension === 'undefined'
  ) {
    red(`logExtensionFromExtensions: ${filePath} has no valid extension`)
  } else if (parsedExtension && parsedExtension.extension) {
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
  }
}
