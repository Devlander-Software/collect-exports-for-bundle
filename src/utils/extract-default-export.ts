import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'
export function extractDefaultExportVariable(filepath: string): string | null {
  const fs = require('fs')
  try {
    logColoredMessage(`Extracting default export from ${filepath}...`, 'green')
    const fileContent = fs.readFileSync(filepath, 'utf-8')
    const defaultExportMatch = fileContent.match(
      regexDefinitions.matchesDefaultExport
    )
    return defaultExportMatch ? defaultExportMatch[1] : null
  } catch (e) {
    return null
  }
}
