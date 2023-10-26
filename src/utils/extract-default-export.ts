import { logColoredMessage } from './log-with-color'
export function extractDefaultExportVariable(filepath: string): string | null {
  const fs = require('fs')

  try {
    logColoredMessage(`Extracting default export from ${filepath}...`, 'green')
    const fileContent = fs.readFileSync(filepath, 'utf-8')
    const defaultExportMatch = fileContent.match(/export default (\w+)/)
    return defaultExportMatch ? defaultExportMatch[1] : null
  } catch (e) {
    return null
  }
}
