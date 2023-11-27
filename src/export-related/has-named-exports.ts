import { regexDefinitions } from '../constraints/regex-definitions'
import { testForPattern } from '../constraints/test-for-pattern'
import { logMessageForFunction } from '../utils/log-with-color'

export function hasNamedExports(fileContent: string, debug?: boolean): boolean {
  const hasExport = testForPattern(
    fileContent,
    regexDefinitions.matchesNamedExport
  )
  if (debug) {
    logMessageForFunction('hasNamedExports', {
      fileContent,
      hasExport
    })
  }
  return hasExport
}
