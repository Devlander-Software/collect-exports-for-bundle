import { regexDefinitions } from './regex-definitions'

export function testForExportPattern(
  fileContent: string,
  pattern: RegExp
): boolean {
  return pattern.test(fileContent)
}

export function hasNamedExports(fileContent: string): boolean {
  return testForExportPattern(fileContent, regexDefinitions.matchesNamedExport)
}

export function hasDefaultExport(fileContent: string): boolean {
  return testForExportPattern(
    fileContent,
    regexDefinitions.matchesDefaultExport
  )
}

export const hasNoExports = (fileContent: string): boolean => {
  return !hasNamedExports(fileContent) && !hasDefaultExport(fileContent)
}
