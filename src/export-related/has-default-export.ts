import { regexDefinitions } from '../constraints/regex-definitions'
import { testForPatterns } from '../constraints/test-for-patterns'
import { logMessageForFunction } from '../utils/log-with-color'

export function hasDefaultExport(
  fileContent: string,
  debug?: boolean
): boolean {
  const hasExport = testForPatterns(fileContent, [
    regexDefinitions.matchesDefaultExport,
    regexDefinitions.matchesExportNamedAsDefault
  ])

  if (debug) {
    logMessageForFunction('hasDefaultExport', {
      hasExport,
      fileContent
    })
  }

  return hasExport
}
