import { namedExportDefinitions } from '../constraints/regex-definitions'
import { testForPatterns } from '../constraints/test-for-patterns'
import { logMessageForFunction } from '../utils/log-with-color'

export function hasNamedExports(fileContent: string, debug?: boolean): boolean {
  const hasExport = testForPatterns(fileContent, namedExportDefinitions)
  if (debug) {
    logMessageForFunction('hasNamedExports', {
      fileContent,
      hasExport
    })
  }
  return hasExport
}
