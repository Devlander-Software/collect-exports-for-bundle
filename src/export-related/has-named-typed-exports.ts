import {
  defaultExportInterfacesTypeExportsDefinitions,
  namedTypeExportsDefinitions
} from '../constraints/regex-definitions'
import { testForPatterns } from '../constraints/test-for-patterns'

import { logMessageForFunction } from '../utils/log-with-color'

export type DeclarationTypeTypes = 'type' | 'interface'
export const defaultDeclarationTypeTypes: DeclarationTypeTypes[] = [
  'type',
  'interface'
]

export function hasNamedTypedExports(
  fileContent: string,
  declarationsToCheck: DeclarationTypeTypes[],
  debug?: boolean
): boolean {
  if (
    !declarationsToCheck ||
    (declarationsToCheck && declarationsToCheck.length === 0)
  ) {
    declarationsToCheck = defaultDeclarationTypeTypes
  }

  const patternsToTest: RegExp[] = []

  const patterns: {
    [key in DeclarationTypeTypes]: RegExp[]
  } = {
    type: namedTypeExportsDefinitions,
    interface: defaultExportInterfacesTypeExportsDefinitions
  }

  for (const declaration of declarationsToCheck) {
    const regexPatterns = patterns[declaration]
    if (!regexPatterns) continue

    patternsToTest.push(...regexPatterns)
  }

  const hasTypeDeclarations = testForPatterns(fileContent, patternsToTest)

  if (debug) {
    logMessageForFunction('hasTypeDeclarations', {
      hasTypeDeclarations,
      fileContent
    })
  }

  return hasTypeDeclarations
}
