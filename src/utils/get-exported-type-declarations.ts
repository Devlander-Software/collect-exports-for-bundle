import fs from 'fs'
import { logColoredMessage } from './log-with-color'
import { regexDefinitions } from './regex-definitions'

type DeclarationTypeTypes = 'type' | 'interface'

const defaultDeclarationKeywords: DeclarationTypeTypes[] = ['type', 'interface']

export function getExportedTypeDeclarations(
  filePath: string,
  declarationsToExport?: DeclarationTypeTypes[]
): string[] | null {
  if (!declarationsToExport) declarationsToExport = defaultDeclarationKeywords

  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')

    const patterns = {
      type: regexDefinitions.matchesTypeExport,
      interface: regexDefinitions.matchesInterfaceExport
    }

    const typeNames: string[] = []
    let match

    for (const declaration of declarationsToExport) {
      const pattern = patterns[declaration]
      if (!pattern) continue

      while ((match = pattern.exec(fileContent)) !== null) {
        typeNames.push(match[1])
      }
    }

    if (!typeNames.length) {
      logColoredMessage(
        `No exported type declarations found in ${filePath}`,
        'yellow'
      )
      return null
    }

    return typeNames
  } catch (error: any) {
    logColoredMessage(
      `Error reading the file "${filePath}": ${error.toString()}`,
      'red'
    )
    return null
  }
}
