export const regexDefinitions = {
  isCamelCase: /^[a-z][a-zA-Z0-9]*$/,
  containsUnderscore: /_/,
  containsDash: /-/,

  containsDuplicateDriveLetters: /([a-zA-Z]):.*\1:/i,

  isDashCase: /^[a-z0-9]+(-[a-z0-9]+)*$/,

  containsSpecialChar: /[^a-zA-Z0-9]+/,

  driveLetterPattern: /^([a-z]):/i,

  isSnakeCase: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,

  isPascalCase: /^[A-Z][a-zA-Z0-9]*$/,
  isConstantCase: /^[A-Z]+(_[A-Z0-9]+)*$/,
  containsNonWordChar: /[^\w]/,
  defaultFunctionRegex: /export default function (\w+)\(\)/,

  matchesDefaultExport: /export default (\w+)/,
  matchesExportNamedAsDefault:
    /export \{ (\w+) as default \} from '(\.\/\w+)';/,
  matchesNamedExport:
    /export\s+(const|let|var|type|enum|interface|class|function)\s+[a-zA-Z_$][0-9a-zA-Z_$]*|{\s*[a-zA-Z_$][0-9a-zA-Z_$]*\s*}/,
  matchesTypeExport: /export\s+type\s+([a-zA-Z_$][0-9a-zA-Z_$]*)(\s*=|\s+)/g,

  matchesInterfaceExport:
    /export\s+interface\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{[\s\S]*?}/g,
  matchesFunctionExport: /export\s+function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g,
  matchesConstExport:
    /export\s+const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)(:\s*[^=]+)?\s*(=|\()/g,
  matchesLetExport: /export\s+let\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
  matchesVarExport: /export\s+var\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,

  matchesEnumExport: /export\s+enum\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*{[\s\S]*?}/g,
  matchesClassExport: /export\s+class\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g
}

// export interface ThemeBase {
//   colors: ColorsInterface;
//   fonts: FontsInterface;
//   darkThemeEnabled?: boolean;
//   padding?: PaddingOnThemeType;
//   elevation?: ElevationType;
//   deviceOnTheme: DeviceOnTheme;
// }

// Test for this

// export interface TextInterfaceNative
//   extends

// export type NativeTheme = GenericTheme<number>;
// export type WebTheme = GenericTheme<string | number>;
