import { regexDefinitions } from '../constraints/regex-definitions'
import { getFileContent } from '../utils/get-file-content'
import {
  logColoredMessage,
  logMessageForFunction
} from '../utils/log-with-color'

/**
 * Extracts the default export variable from a file.
 * @param filepath Path to the file to extract the default export from.
 * @returns The default export variable or null if no default export exists.
 */
export function extractDefaultExportVariable(filepath: string): string | null {
  try {
    logColoredMessage(`Extracting default export from ${filepath}...`, 'green')
    const fileContent = getFileContent(filepath)
    const defaultExportMatch = fileContent.match(
      regexDefinitions.matchesDefaultExport
    )

    const result =
      defaultExportMatch && defaultExportMatch[1] ? defaultExportMatch[1] : null
    logMessageForFunction('extractDefaultExportVariable', { result })
    return result
  } catch (e) {
    return null
  }
}
