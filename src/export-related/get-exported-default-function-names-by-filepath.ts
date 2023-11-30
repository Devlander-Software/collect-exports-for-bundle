import fs from 'fs'
import { logColoredMessage } from '../utils/log-with-color'
import { getExportedDefaultFunctionsByFileContent } from './get-exported-default-function-names-by-filecontent'

export function getExportedDefaultFunctionsByFilePath(
  filePath: string,
  debug?: boolean
): string[] {
  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return []
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const result = getExportedDefaultFunctionsByFileContent(fileContent, debug)
    return result
  } catch (error: any) {
    logColoredMessage(
      `Error reading the file "${filePath}": ${error.toString()}`,
      'red'
    )
    return []
  }
}
