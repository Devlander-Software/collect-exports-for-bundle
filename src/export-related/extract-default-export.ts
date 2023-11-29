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
    let result: string | null = null
    logColoredMessage(`Extracting default export from ${filepath}...`, 'green')
    const fileContent = getFileContent(filepath)
    const defaultExportMatch = fileContent.match(
      regexDefinitions.matchesDefaultExport
    )

    const exportNamedAsDefaultMatch = fileContent.match(
      regexDefinitions.matchesExportNamedAsDefault
    )

    if (exportNamedAsDefaultMatch && exportNamedAsDefaultMatch[1]) {
      logMessageForFunction('extractDefaultExportVariable', {
        result: exportNamedAsDefaultMatch[1]
      })
      result = exportNamedAsDefaultMatch[1]
    } else if (defaultExportMatch && defaultExportMatch[1]) {
      logMessageForFunction('extractDefaultExportVariable', { result: null })
      result = defaultExportMatch[1]
    }

    logMessageForFunction('extractDefaultExportVariable', { result })
    return result
  } catch (e) {
    return null
  }
}
