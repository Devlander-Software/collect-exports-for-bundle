import fs from 'fs'
import { DeclarationTypeTypes } from '../types/variable-function-declaration.types'
import { logColoredMessage } from '../utils/log-with-color'
import { getExportedTypeDeclarationsByFileContent } from './get-exported-type-declarations-by-filecontent'

export function getExportedTypeDeclarationsByFilePath(
  filePath: string,
  declarationsToExport?: DeclarationTypeTypes[],
  debug?: boolean
): string[] {
  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return []
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const result = getExportedTypeDeclarationsByFileContent(
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
