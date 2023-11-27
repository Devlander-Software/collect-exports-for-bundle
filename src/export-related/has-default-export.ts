import { regexDefinitions } from '../constraints/regex-definitions'
import { testForPattern } from '../constraints/test-for-pattern'
import { logMessageForFunction } from '../utils/log-with-color'

export function hasDefaultExport(
  fileContent: string,
  debug?: boolean
): boolean {
  const hasExport = testForPattern(
    fileContent,
    regexDefinitions.matchesDefaultExport
  )
  if (debug) {
    logMessageForFunction('hasDefaultExport', {
      hasExport,
      fileContent
    })
  }

  return hasExport
}
