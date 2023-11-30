import { regexDefinitions } from '../constraints/regex-definitions'
import { logMessageForFunction } from '../utils/log-with-color'

/**
 * Extracts the default export variable from a file.
 * @param filepath Path to the file to extract the default export from.
 * @returns The default export variable or null if no default export exists.
 */
export function extractDefaultExportVariable(
  fileContent: string
): string | null {
  try {
    const reservedWords = [
      'export',
      'default',
      'function',
      'const',
      'let',
      'var',
      'class',
      'interface',
      'type',
      'enum',
      'abstract',
      'implements',
      'extends',
      'import',
      'from',
      'as',
      'new',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do'
    ]
    let result: string | null = null
    const defaultExportMatch = fileContent.match(
      regexDefinitions.matchesDefaultExport
    )

    const exportNamedAsDefaultMatch = fileContent.match(
      regexDefinitions.matchesExportNamedAsDefault
    )

    const defaultFunctionExportMatch = fileContent.match(
      regexDefinitions.defaultFunctionRegex
    )

    if (
      exportNamedAsDefaultMatch &&
      exportNamedAsDefaultMatch[1] &&
      !reservedWords.includes(exportNamedAsDefaultMatch[1])
    ) {
      result = exportNamedAsDefaultMatch[1]
    } else if (
      defaultExportMatch &&
      defaultExportMatch[1] &&
      !reservedWords.includes(defaultExportMatch[1])
    ) {
      result = defaultExportMatch[1]
    } else if (
      defaultFunctionExportMatch &&
      defaultFunctionExportMatch[1] &&
      !reservedWords.includes(defaultFunctionExportMatch[1])
    ) {
      result = defaultFunctionExportMatch[1]
    }

    logMessageForFunction('extractDefaultExportVariable', { result })
    return result
  } catch (e) {
    return null
  }
}
