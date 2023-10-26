export function testForExportPattern(
  fileContent: string,
  pattern: RegExp
): boolean {
  return pattern.test(fileContent)
}

export function hasNamedExports(fileContent: string): boolean {
  return testForExportPattern(fileContent, /export\s+(?!default)/)
}

export function hasDefaultExport(fileContent: string): boolean {
  return testForExportPattern(fileContent, /export default/)
}
