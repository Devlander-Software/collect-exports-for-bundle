import { logColoredMessage } from '../utils/log-with-color'
import { regexDefinitions } from './regex-definitions'

// this is what is inside of regexDefinitions
// export const regexDefinitions = {
//   isCamelCase: /^[a-z][a-zA-Z0-9]*$/,
//   containsUnderscore: /_/,
//   containsDash: /-/,
//   containsDuplicateDriveLetters: /(^[a-zA-Z]:)(\\[a-zA-Z]:)/,
//   isDashCase: /^[a-z0-9]+(-[a-z0-9]+)*$/,
//   containsSpecialChar: /[^a-zA-Z0-9]/,
//   isSnakeCase: /^[a-z]+(_[a-z0-9]+)*$/,
//   isPascalCase: /^[A-Z][a-zA-Z0-9]*$/,
//   isConstantCase: /^[A-Z]+(_[A-Z0-9]+)*$/,
//   containsNonWordChar: /[^\w]/g,
//   matchesDefaultExport: /export default (\w+)/,
//   matchesNamedExport:
//     /export\s+(const|let|var|type|enum|interface|class|function)\s+[a-zA-Z_$][0-9a-zA-Z_$]*|{\s*[a-zA-Z_$][0-9a-zA-Z_$]*\s*}/,
//   matchesTypeExport: /export\s+type\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
//   matchesInterfaceExport:
//     /export\s+interface\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{/g,
//   matchesFunctionExport: /export\s+function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g,
//   matchesConstExport: /export\s+const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
//   matchesLetExport: /export\s+let\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
//   matchesVarExport: /export\s+var\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
//   matchesEnumExport: /export\s+enum\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{/g,
//   matchesClassExport: /export\s+class\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g
// }

export function isCamelCase(str: string, debug?: boolean): boolean {
  regexDefinitions

  if (
    !regexDefinitions.isCamelCase.test(str) ||
    regexDefinitions.containsUnderscore.test(str) ||
    regexDefinitions.isDashCase.test(str) ||
    regexDefinitions.containsSpecialChar.test(str)
  ) {
    if (debug) {
      logColoredMessage(`${str} is not in camelCase.`, 'red')
    }
    return false
  } else {
    return true
  }
}
