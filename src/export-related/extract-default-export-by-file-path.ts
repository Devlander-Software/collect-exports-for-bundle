import { getFileContent } from '../utils/get-file-content'
import { logColoredMessage } from '../utils/log-with-color'
import { extractDefaultExportVariable } from './extract-default-export'

/**
 * Extracts the default export variable from a file.
 * @param filepath Path to the file to extract the default export from.
 * @returns The default export variable or null if no default export exists.
 */
export function extractDefaultExportVariableByFilePath(
  filepath: string
): string | null {
  try {
    let result: string | null = null
    logColoredMessage(`Extracting default export from ${filepath}...`, 'green')
    const fileContent = getFileContent(filepath)
    result = extractDefaultExportVariable(fileContent)
    return result
  } catch (e) {
    return null
  }
}
