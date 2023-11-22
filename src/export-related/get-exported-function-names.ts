import fs from 'fs'
import { regexDefinitions } from '../constraints/regex-definitions'
import { logColoredMessage } from '../utils/log-with-color'

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
  declarationsToExport?: DeclarationTypes[],
  debug?: boolean
): string[] | null {
  if (!declarationsToExport) declarationsToExport = defaultDeclarationKeywords
  try {
    if (!fs.existsSync(filePath)) {
      logColoredMessage(`File not found: "${filePath}"`, 'yellow')
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')

    const patterns = {
      function: regexDefinitions.matchesFunctionExport,
      const: regexDefinitions.matchesConstExport,
      let: regexDefinitions.matchesLetExport,
      var: regexDefinitions.matchesVarExport,
      enum: regexDefinitions.matchesEnumExport,

      class: regexDefinitions.matchesClassExport
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
      if (debug) {
        logColoredMessage(`No named exports found in ${filePath}`, 'blue')
      }
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
