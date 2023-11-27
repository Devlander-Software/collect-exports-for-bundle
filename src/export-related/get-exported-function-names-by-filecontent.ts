import { regexDefinitions } from '../constraints/regex-definitions'
import { logColoredMessage } from '../utils/log-with-color'
export type DeclarationTypes =
  | 'function'
  | 'const'
  | 'let'
  | 'var'
  | 'class'
  | 'enum'

export const defaultDeclarationKeywords: DeclarationTypes[] = [
  'function',
  'const',
  'let',
  'var',
  'enum',
  'class'
]
export const getExportedFunctionNamesByFileContent = (
  fileContent: string,
  declarationsToExport?: DeclarationTypes[],
  debug?: boolean
): string[] => {
  if (
    !declarationsToExport ||
    (declarationsToExport && declarationsToExport.length === 0)
  )
    declarationsToExport = defaultDeclarationKeywords
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
      logColoredMessage(`No named exports found in ${fileContent}`, 'blue')
    }
    return []
  }

  if (functionNames !== null) {
    return functionNames
  } else {
    return []
  }
}
