import { regexDefinitions } from '../constraints/regex-definitions'
import {
  DeclarationTypeTypes,
  defaultDeclarationTypeTypes
} from '../types/variable-function-declaration.types'
import { logColoredMessage } from '../utils/log-with-color'

export const getExportedTypeDeclarationsByFileContent = (
  fileContent: string,
  declarationsToExport?: DeclarationTypeTypes[],
  debug?: boolean
): string[] => {
  if (
    !declarationsToExport ||
    (declarationsToExport && declarationsToExport.length === 0)
  ) {
    declarationsToExport = defaultDeclarationTypeTypes
  }

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

  if (!typeNames.length && debug) {
    logColoredMessage(
      `No exported type declarations found in ${fileContent}`,
      'yellow'
    )
    return []
  }

  if (typeNames !== null) {
    return typeNames
  } else {
    return []
  }
}
