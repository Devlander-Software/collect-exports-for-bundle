import fs from 'fs'
import { logColoredMessage } from './log-with-color'

type DeclarationTypes = 'function' | 'const' | 'let' | 'var' | 'class' | 'enum'

const defaultDeclarationKeywords: DeclarationTypes[] = [
  'function',
  'const',
  'let',
  'var',
  'enum',
  'class'
]

export function getExportedFunctionNames(
  filePath: string,
  declarationsToExport?: DeclarationTypes[]
): string[] | null {
  if (!declarationsToExport) declarationsToExport = defaultDeclarationKeywords
  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')

    const patterns = {
      function: /export\s+function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g,
      const: /export\s+const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
      let: /export\s+let\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
      var: /export\s+var\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
      enum: /export\s+enum\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{/g,

      class: /export\s+class\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g
    }

    const functionNames: string[] = []
    let match

    for (const declaration of declarationsToExport) {
      const pattern = patterns[declaration]
      if (!pattern) continue

      while ((match = pattern.exec(fileContent)) !== null) {
        functionNames.push(match[1])
      }
    }

    if (!functionNames.length) {
      logColoredMessage(`No named exports found in ${filePath}`, 'blue')
      return null
    }

    return functionNames
  } catch (error: any) {
    logColoredMessage(
      `Error reading the file "${filePath}": ${error.toString()}`,
      'red'
    )
    return null
  }
}
