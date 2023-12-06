import fs from 'fs'
import { DeclarationTypes } from '../types/variable-function-declaration.types'
import { logColoredMessage } from '../utils/log-with-color'
import { getExportedFunctionNamesByFileContent } from './get-exported-function-names-by-filecontent'

export function getExportedFunctionNamesByFilePath(
  filePath: string,
  declarationsToExport?: DeclarationTypes[],
  debug?: boolean
): string[] {
  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return []
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const result = getExportedFunctionNamesByFileContent(
      fileContent,
      declarationsToExport,
      debug
    )
    return result
  } catch (error: any) {
    logColoredMessage(
      `Error reading the file "${filePath}": ${error.toString()}`,
      'red'
    )
    return []
  }
}
