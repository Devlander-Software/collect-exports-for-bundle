import { regexDefinitions } from '../constraints/regex-definitions'
import {
  DeclarationTypes,
  defaultDeclarationTypes
} from '../types/variable-function-declaration.types'
import { logColoredMessage } from '../utils/log-with-color'

export const getExportedFunctionNamesByFileContent = (
  fileContent: string,
  declarationsToExport?: DeclarationTypes[],
  debug?: boolean
): string[] => {
  if (
    !declarationsToExport ||
    (declarationsToExport && declarationsToExport.length === 0)
  )
    declarationsToExport = defaultDeclarationTypes
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
