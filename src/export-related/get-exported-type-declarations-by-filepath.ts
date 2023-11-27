import fs from 'fs'
import { logColoredMessage } from '../utils/log-with-color'
import {
  DeclarationTypeTypes,
  getExportedTypeDeclarationsByFileContent
} from './get-exported-type-declarations-by-filecontent'

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
