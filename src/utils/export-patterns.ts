export function testForExportPattern(
  fileContent: string,
  pattern: RegExp
): boolean {
  return pattern.test(fileContent)
}

export function hasNamedExports(fileContent: string): boolean {
  const namedExportPattern =
    /export\s+(const\s+|let\s+|var\s+|type\s+|enum\s+|interface\s+|class\s+|function\s+[a-zA-Z_$][0-9a-zA-Z_$]*|{\s*[a-zA-Z_$][0-9a-zA-Z_$]*\s*})/

  return testForExportPattern(fileContent, namedExportPattern)
}

export function hasDefaultExport(fileContent: string): boolean {
  return testForExportPattern(
    fileContent,
    /export\s+default\s+(\w+|\(.*\)|{.*}|function\s*(\w*\s*)?\(.*\)|class\s+\w+\s*)/
  )
}

export const hasNoExports = (fileContent: string): boolean => {
  return !hasNamedExports(fileContent) && !hasDefaultExport(fileContent)
}
