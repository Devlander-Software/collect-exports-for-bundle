export function testForPattern(fileContent: string, pattern: RegExp): boolean {
  return pattern.test(fileContent)
}
