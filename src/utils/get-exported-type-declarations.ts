import fs from 'fs'
import { logColoredMessage } from './log-with-color'

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
      type: /export\s+type\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
      interface: /export\s+interface\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{/g
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
