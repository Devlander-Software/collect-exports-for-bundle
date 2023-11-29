export function testForPatterns(
  fileContent: string,
  patterns: RegExp[]
): boolean {
  let foundInPattern = false
  patterns.forEach((pattern) => {
    if (pattern.test(fileContent)) {
      foundInPattern = true
    }
  })
  return foundInPattern
}
