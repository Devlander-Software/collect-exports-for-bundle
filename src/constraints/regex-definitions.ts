/**
 * Represents the general regex definitions for the project
 * @name regexDefinitions
 * @type {}
 * @property {RegExp} isCamelCase - Matches a camel case string
 * @property {RegExp} containsUnderscore - Matches a string that contains an underscore
 * @property {RegExp} containsDash - Matches a string that contains a dash
 * @property {RegExp} containsDuplicateDriveLetters - Matches a string that contains duplicate drive letters
 * @property {RegExp} isDashCase - Matches a dash case string
 * @property {RegExp} containsSpecialChar - Matches a string that contains a special character
 * @property {RegExp} driveLetterPattern - Matches a drive letter pattern
 * @property {RegExp} isSnakeCase - Matches a snake case string
 * @property {RegExp} isPascalCase - Matches a pascal case string
 * @property {RegExp} isConstantCase - Matches a constant case string
 * @property {RegExp} containsNonWordChar - Matches a string that contains a non word character
 * @property {RegExp} defaultFunctionRegex - Matches a default function regex
 * @property {RegExp} matchesDefaultExport - Matches a default export
 * @property {RegExp} matchesExportNamedAsDefault - Matches an export named as default
 * @property {RegExp} matchesNamedExport - Matches a named export
 * @property {RegExp} matchesTypeExport - Matches a type export
 * @property {RegExp} matchesInterfaceExport - Matches an interface export
 * @property {RegExp} matchesFunctionExport - Matches a function export
 * @property {RegExp} matchesConstExport - Matches a const export
 * @property {RegExp} matchesLetExport - Matches a let export
 * @property {RegExp} matchesVarExport - Matches a var export
 * @property {RegExp} matchesEnumExport - Matches an enum export
 * @property {RegExp} matchesClassExport - Matches a class export
 * @description This is a list of all the regex definitions for the project which will eventually be moved to a separate objects and files
 */

export const regexDefinitions: {
  [key: string]: RegExp
} = {
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

/**
 * Represents the regex definitions for typescript types
 *
 * @name enumRegexDefinitions
 * @type {}

  * @property {RegExp} namedNumericEnum - Matches a named numeric enum

  * @property {RegExp} namedInitializedNumericEnum - Matches a named initialized numeric enum
  * @property {RegExp} namedFullyInitializedNumericEnum - Matches a named fully initialized numeric enum
  * @property {RegExp} namedStringEnum - Matches a named string enum
  * @property {RegExp} namedHeterogeneousEnum - Matches a named heterogeneous enum
  * @property {RegExp} namedConstEnum - Matches a named const enum
  * @property {RegExp} namedRuntimeEnum - Matches a named runtime enum
  * @property {RegExp} namedCompileTimeEnum - Matches a named compile time enum
  * @property {RegExp} namedReverseMappingEnum - Matches a named reverse mapping enum
  * @property {RegExp} namedOpenEndedEnum - Matches a named open ended enum
 * @description This is a list of all the regex definitions for enums in typescript
 */

export const enumRegexDefinitions = {
  namedNumericEnum: /export enum \w+\s*{[^}]*}/,
  namedInitializedNumericEnum: /export enum \w+\s*{\s*\w+\s*=\s*\d+[^}]*}/,

  namedFullyInitializedNumericEnum:
    /export enum \w+\s*{\s*(\w+\s*=\s*\d+\s*,\s*)+\w+\s*=\s*\d+\s*}/,

  namedStringEnum: /export enum \w+\s*{\s*\w+\s*=\s*".+"[^}]*}/,
  namedHeterogeneousEnum: /export enum \w+\s*{[^}]*\d+[^}]*".+"[^}]*}/,

  namedConstEnum: /export const enum \w+\s*{[^}]*}/,
  namedRuntimeEnum: /export enum \w+\s*{\s*\w+[^}]*}/,
  namedCompileTimeEnum: /export enum \w+\s*{\s*\w+\s*[^}]*}/,
  namedReverseMappingEnum: /export enum \w+\s*{\s*\w+[^}]*}/,
  namedOpenEndedEnum: /export enum \w+\s*{[^}]*}\s*enum \w+\s*{[^}]*}/
}

/**
 * Represents the regex definitions for typescript types
 *
 * @name functionRegexDefinitions
 * @type {}
 * @property {RegExp} functionDeclarationNamedExport - Matches a function declaration named export
 * @property {RegExp} functionDeclarationDefaultExport - Matches a function declaration default export
 * @property {RegExp} functionExpressionNamedExport - Matches a function expression named export
 * @property {RegExp} functionExpressionDefaultExport - Matches a function expression default export
 * @property {RegExp} arrowFunctionNamedExport - Matches an arrow function named export
 * @property {RegExp} arrowFunctionDefaultExport - Matches an arrow function default export
 * @property {RegExp} iifeDefaultExport - Matches an iife default export
 * @property {RegExp} generatorFunctionNamedExport - Matches a generator function named export
 * @property {RegExp} generatorFunctionDefaultExport - Matches a generator function default export
 * @property {RegExp} asyncFunctionNamedExport - Matches an async function named export
 * @property {RegExp} asyncFunctionDefaultExport - Matches an async function default export
 * @property {RegExp} constructorFunctionNamedExport - Matches a constructor function named export
 * @property {RegExp} constructorFunctionDefaultExport - Matches a constructor function default export
 * @property {RegExp} methodInObjectLiteralNamedExport - Matches a method in object literal named export
 * @property {RegExp} methodInObjectLiteralDefaultExport - Matches a method in object literal default export
 * @property {RegExp} staticMethodInClassNamedExport - Matches a static method in class named export
 * @property {RegExp} staticMethodInClassDefaultExport - Matches a static method in class default export
 * @property {RegExp} classMethodNamedExport - Matches a class method named export
 * @property {RegExp} classMethodDefaultExport - Matches a class method default export
 * @description This is a list of all the regex definitions for functions in typescript
 */

export const functionRegexDefinitions = {
  functionDeclarationNamedExport:
    /export\s+function\s+\w+\s*\([^)]*\)\s*:\s*\w+\s*{[^}]*}/,
  functionDeclarationDefaultExport:
    /export\s+default\s+function\s+\w+\s*\([^)]*\)\s*:\s*\w+\s*{[^}]*}/,

  functionExpressionNamedExport:
    /const\s+\w+\s*:\s*\([^)]*\)\s*=>\s*\w+\s*=\s*function\([^)]*\)\s*{[^}]*};\s*export\s+default\s+\w+;/,
  functionExpressionDefaultExport:
    /export\s+default\s+const\s+\w+\s*:\s*\([^)]*\)\s*=>\s*\w+\s*=\s*function\([^)]*\)\s*{[^}]*};/,

  arrowFunctionNamedExport:
    /const\s+\w+\s*:\s*\([^)]*\)\s*=>\s*\w+\s*=\s*\([^)]*\)\s*=>\s*[^;]+;\s*export\s+default\s+\w+;/,
  arrowFunctionDefaultExport:
    /export\s+default\s+\([^)]*\)\s*:\s*\w+\s*=>\s*[^;]+;/,

  iifeDefaultExport:
    /export\s+default\s+\(\s*function\(\)\s*:\s*\w+\s*{\s*return\s+[^;]+;\s*}\s*\)\(\);/,

  generatorFunctionNamedExport:
    /export\s+function\s*\*\s+\w+\s*\(\)\s*:\s*Generator<\w+>\s*{[^}]*}/,
  generatorFunctionDefaultExport:
    /export\s+default\s+function\s*\*\s+\w+\s*\(\)\s*:\s*Generator<\w+>\s*{[^}]*}/,

  asyncFunctionNamedExport:
    /export\s+async\s+function\s+\w+\s*\([^)]*\)\s*:\s*Promise<\w+>\s*{[^}]*}/,
  asyncFunctionDefaultExport:
    /export\s+default\s+async\s+function\s+\w+\s*\([^)]*\)\s*:\s*Promise<\w+>\s*{[^}]*}/,

  constructorFunctionNamedExport:
    /class\s+\w+\s*{\s*constructor\([^)]*\)\s*{\s*[^}]*}\s*}\s*export\s+default\s+\w+;/,
  constructorFunctionDefaultExport:
    /export\s+default\s+class\s+\w+\s*{\s*constructor\([^)]*\)\s*{\s*[^}]*}\s*}/,

  methodInObjectLiteralNamedExport:
    /const\s+\w+\s*=\s*{\s*\w+\([^)]*\)\s*:\s*\w+\s*{\s*[^}]*}\s*};\s*export\s+default\s+\w+;/,
  methodInObjectLiteralDefaultExport:
    /export\s+default\s+{\s*\w+\([^)]*\)\s*:\s*\w+\s*{\s*[^}]*}\s*};/,

  staticMethodInClassNamedExport:
    /class\s+\w+\s*{\s*static\s+\w+\(\)\s*:\s*\w+\s*{\s*[^}]*}\s*}\s*export\s+default\s+\w+;/,
  staticMethodInClassDefaultExport:
    /export\s+default\s+class\s+\w+\s*{\s*static\s+\w+\(\)\s*:\s*\w+\s*{\s*[^}]*}\s*}/,

  classMethodNamedExport:
    /class\s+\w+\s*{\s*\w+\(\)\s*:\s*\w+\s*{\s*[^}]*}\s*}\s*export\s+default\s+\w+;/,
  classMethodDefaultExport:
    /export\s+default\s+class\s+\w+\s*{\s*\w+\(\)\s*:\s*\w+\s*{\s*[^}]*}\s*}/
}

/**
 * Represents the regex definitions for typescript types
 *
 * @name typeScriptInterfaceRegexDefinitions
 * @type {}
 * @property {RegExp} basicNamedInterfaceExport - Matches a basic named interface export
 * @property {RegExp} basicDefaultInterfaceExport - Matches a basic default interface export
 * @property {RegExp} interfaceWithOptionalPropertiesNamedExport - Matches an interface with optional properties named export
 * @property {RegExp} interfaceWithOptionalPropertiesDefaultExport - Matches an interface with optional properties default export
 * @property {RegExp} interfaceWithReadonlyPropertiesNamedExport - Matches an interface with readonly properties named export
 * @property {RegExp} interfaceWithReadonlyPropertiesDefaultExport - Matches an interface with readonly properties default export
 * @property {RegExp} functionTypeInterfaceNamedExport - Matches a function type interface named export
 * @property {RegExp} functionTypeInterfaceDefaultExport - Matches a function type interface default export
 * @property {RegExp} indexableTypesNamedExport - Matches an indexable types named export
 * @property {RegExp} indexableTypesDefaultExport - Matches an indexable types default export
 * @property {RegExp} classTypeInterfaceNamedExport - Matches a class type interface named export
 * @property {RegExp} classTypeInterfaceDefaultExport - Matches a class type interface default export
 * @property {RegExp} extendingInterfacesNamedExport - Matches an extending interfaces named export
 * @property {RegExp} extendingInterfacesDefaultExport - Matches an extending interfaces default export
 * @property {RegExp} hybridTypesNamedExport - Matches a hybrid types named export
 * @property {RegExp} hybridTypesDefaultExport - Matches a hybrid types default export
 * @property {RegExp} genericInterfaceNamedExport - Matches a generic interface named export
 * @property {RegExp} genericInterfaceDefaultExport - Matches a generic interface default export
 * @property {RegExp} interfaceForDictionaryPatternNamedExport - Matches an interface for dictionary pattern named export
 * @description This is a list of all the regex definitions for typescript interfaces
 */
export const typescriptInterfaceRegexDefinitions: {
  [key: string]: RegExp
} = {
  basicNamedInterfaceExport: /export\s+interface\s+\w+\s*{[^}]*}/,
  basicDefaultInterfaceExport: /export\s+default\s+interface\s+\w+\s*{[^}]*}/,
  interfaceWithOptionalPropertiesNamedExport:
    /export\s+interface\s+\w+\s*{\s*(\w+\s*:\s*\w+;\s*)*(\w+\s*\?\s*:\s*\w+;\s*)+}/,
  interfaceWithOptionalPropertiesDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*(\w+\s*:\s*\w+;\s*)*(\w+\s*\?\s*:\s*\w+;\s*)+}/,
  interfaceWithReadonlyPropertiesNamedExport:
    /export\s+interface\s+\w+\s*{\s*readonly\s+\w+:[^}]*}/,
  interfaceWithReadonlyPropertiesDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*readonly\s+\w+:[^}]*}/,
  functionTypeInterfaceNamedExport:
    /export\s+interface\s+\w+\s*{\s*\(\s*\w+:\s*\w+,\s*\w+:\s*\w+\s*\)\s*:\s*\w+;[^}]*}/,
  functionTypeInterfaceDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*\(\s*\w+:\s*\w+,\s*\w+:\s*\w+\s*\)\s*:\s*\w+;[^}]*}/,
  indexableTypesNamedExport:
    /export\s+interface\s+\w+\s*{\s*\[\s*index:\s*\w+\s*\]:\s*\w+;[^}]*}/,
  indexableTypesDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*\[\s*index:\s*\w+\s*\]:\s*\w+;[^}]*}/,
  classTypeInterfaceNamedExport:
    /export\s+interface\s+\w+\s*{\s*\w+:\s*\w+;\s*set\w+\(\s*\w+:\s*\w+\s*\):\s*void;[^}]*}/,
  classTypeInterfaceDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*\w+:\s*\w+;\s*set\w+\(\s*\w+:\s*\w+\s*\):\s*void;[^}]*}/,
  extendingInterfacesNamedExport:
    /export\s+interface\s+\w+\s+extends\s+\w+\s*{[^}]*}/,
  extendingInterfacesDefaultExport:
    /export\s+default\s+interface\s+\w+\s+extends\s+\w+\s*{[^}]*}/,
  hybridTypesNamedExport:
    /export\s+interface\s+\w+\s*{\s*\(\s*\w+:\s*\w+\s*\):\s*\w+;\s*\w+:\s*\w+;\s*\w+\(\):\s*void;[^}]*}/,
  hybridTypesDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*\(\s*\w+:\s*\w+\s*\):\s*\w+;\s*\w+:\s*\w+;\s*\w+\(\):\s*void;[^}]*}/,
  genericInterfaceNamedExport: /export\s+interface\s+\w+<\w+>\s*{[^}]*}/,
  genericInterfaceDefaultExport:
    /export\s+default\s+interface\s+\w+<\w+>\s*{[^}]*}/,
  interfaceForDictionaryPatternNamedExport:
    /export\s+interface\s+\w+<\w+>\s*{\s*\[\s*key:\s*string\s*\]:\s*\w+\s*;.*}/
}

export const typescriptTypeRegexDefinitions: {
  [key: string]: RegExp
} = {
  // Named Exports
  basicTypesNamedExport:
    /export\s+(let|const)\s+\w+\s*:\s*(number|string|boolean|null|undefined)\b/,
  arrayTypeNamedExport: /export\s+(let|const|var)\s+\w+\s*:\s*\w+\[\s*\];?/,
  tupleTypeNamedExport:
    /export\s+(let|const|var)\s+\w+\s*:\s*\[([a-zA-Z]+)(,\s*[a-zA-Z]+)*\];?/,
  enumTypeNamedExport: /export\s+enum\s+\w+\s*{[^}]*}/,
  anyTypeNamedExport: /export\s+(let|const|var)\s+\w+\s*:\s*any\b;?/,
  voidTypeNamedExport: /export\s+function\s+\w+\s*\(\)\s*:\s*void\s*{.*}/,
  neverTypeNamedExport: /export\s+function\s+\w+\s*\(\)\s*:\s*never\s*{.*}/,
  unknownTypeNamedExport: /export\s+(let|const|var)\s+\w+\s*:\s*unknown\b;?/,
  objectTypeNamedExport: /export\s+(let|const|var)\s+\w+\s*:\s*object\b;?/,
  unionTypeNamedExport: /export\s+\w+\s*:\s*[^|]+\s*\|\s*[^|]+/,
  intersectionTypeNamedExport:
    /export\s+(let|const|var)\s+\w+\s*:\s*\w+\s*&\s*\w+\s*;?/,
  literalTypeNamedExport:
    /export\s+(let|const|var)\s+\w+\s*:\s*(".*?"|'.*?')(\s*\|\s*(".*?"|'.*?'))*;?/,

  typeAliasNamedExport: /export\s+type\s+\w+\s*=\s*.+/,
  functionTypeNamedExport: /export\s+type\s+\w+\s*=\s*\([^)]*\)\s*=>\s*.+/,
  genericTypeNamedExport: /export\s+type\s+\w+<\w+>\s*=\s*.+/,
  indexSignatureNamedExport:
    /export\s+interface\s+\w+\s*{\s*\[\s*index:\s*\w+\s*\]:\s*\w+;/,
  mappedTypeNamedExport:
    /export\s+type\s+\w+\s*<\w+>\s*=\s*{\s*readonly\s*\[\s*P\s*in\s*keyof\s*\w+\s*\]:\s*T\[P\]\s*;?\s*}/,
  conditionalTypeNamedExport:
    /export\s+type\s+\w+\s*<\w+>\s*=\s*\w+\s*extends\s+[^?]+?\s*\?\s*".*"\s*:\s*".*";/,

  utilityTypeNamedExport:
    /export\s+type\s+\w+\s*=\s*(Partial|Readonly|Record)<\w+>;/,

  // Default Exports
  basicTypesDefaultExport:
    /export\s+default\s+(let|const)\s+\w+\s*:\s*(number|string|boolean|null|undefined)\b/,
  arrayTypeDefaultExport: /export\s+default\s+\w+\s*:\s*\w+\[\]/,
  tupleTypeDefaultExport: /export\s+default\s+\w+\s*:\s*\[\w+(,\s*\w+)*\]/,
  enumTypeDefaultExport: /export\s+default\s+enum\s+\w+\s*{[^}]*}/,
  anyTypeDefaultExport: /export\s+default\s+\w+\s*:\s*any\b/,
  voidTypeDefaultExport:
    /export\s+default\s+function\s+\w+\s*\(\)\s*:\s*void\s*{.*}/,
  neverTypeDefaultExport:
    /export\s+default\s+function\s+\w+\s*\(\)\s*:\s*never\s*{.*}/,
  unknownTypeDefaultExport: /export\s+default\s+\w+\s*:\s*unknown\b/,
  objectTypeDefaultExport: /export\s+default\s+\w+\s*:\s*object\b/,
  unionTypeDefaultExport: /export\s+default\s+\w+\s*:\s*[^|]+\s*\|\s*[^|]+/,
  intersectionTypeDefaultExport:
    /export\s+default\s+\w+\s*:\s*[^&]+\s*&\s*[^&]+/,
  literalTypeDefaultExport:
    /export\s+default\s+\w+\s*:\s*("|')?\w+\1\s*(\|\s*("|')?\w+\3)*/,
  typeAliasDefaultExport: /export\s+default\s+type\s+\w+\s*=\s*.+/,
  functionTypeDefaultExport:
    /export\s+default\s+type\s+\w+\s*=\s*\([^)]*\)\s*=>\s*.+/,
  genericTypeDefaultExport: /export\s+default\s+type\s+\w+<\w+>\s*=\s*.+/,
  indexSignatureDefaultExport:
    /export\s+default\s+interface\s+\w+\s*{\s*\[\s*index:\s*\w+\s*\]:\s*\w+;/,
  mappedTypeDefaultExport:
    /export\s+default\s+type\s+\w+\s*<\w+>\s*=\s*{\s*(readonly)?\s*\[\s*P\s*in\s*keyof\s*\w+\s*\]:\s*.+}/,
  conditionalTypeDefaultExport:
    /export\s+default\s+type\s+\w+\s*=\s*\w+\s*extends\s*.+\s*\?\s*.+\s*:\s*.+/,
  utilityTypeDefaultExport:
    /export\s+default\s+type\s+\w+\s*=\s*(Partial|Readonly|Record)<\w+>;/
}

/**
 *
 *
 * @name defaultExportDefinitionList
 * @type {string}
 * @description This is a list of all the default exports that are supported
 */
export const defaultExportDefinitionList: RegExp[] = [
  regexDefinitions.matchesDefaultExport,
  regexDefinitions.matchesExportNamedAsDefault,
  typescriptInterfaceRegexDefinitions.basicDefaultInterfaceExport,
  typescriptInterfaceRegexDefinitions.classTypeInterfaceDefaultExport,
  typescriptInterfaceRegexDefinitions.functionTypeInterfaceDefaultExport,
  typescriptInterfaceRegexDefinitions.indexableTypesDefaultExport,
  typescriptInterfaceRegexDefinitions.extendingInterfacesDefaultExport,
  typescriptInterfaceRegexDefinitions.hybridTypesDefaultExport,
  typescriptInterfaceRegexDefinitions.genericInterfaceDefaultExport
]

/**
 *
 *
 * @name namedExportDefinitions
 * @type {string}
 * @description This is a list of all the named exports that are supported
 */

export const namedExportDefinitions: RegExp[] = [
  regexDefinitions.matchesNamedExport,
  functionRegexDefinitions.functionDeclarationNamedExport,
  functionRegexDefinitions.functionExpressionNamedExport,
  functionRegexDefinitions.arrowFunctionNamedExport,
  functionRegexDefinitions.iifeDefaultExport,
  functionRegexDefinitions.generatorFunctionNamedExport,
  functionRegexDefinitions.asyncFunctionNamedExport,
  functionRegexDefinitions.constructorFunctionNamedExport,
  functionRegexDefinitions.methodInObjectLiteralNamedExport,
  functionRegexDefinitions.staticMethodInClassNamedExport,
  functionRegexDefinitions.classMethodNamedExport,
  regexDefinitions.matchesTypeExport,
  regexDefinitions.matchesLetExport,
  regexDefinitions.matchesConstExport,
  regexDefinitions.matchesVarExport,
  regexDefinitions.matchesEnumExport,
  regexDefinitions.matchesClassExport,
  regexDefinitions.matchesFunctionExport,
  enumRegexDefinitions.namedNumericEnum,
  enumRegexDefinitions.namedInitializedNumericEnum,
  enumRegexDefinitions.namedFullyInitializedNumericEnum,
  enumRegexDefinitions.namedStringEnum,
  enumRegexDefinitions.namedHeterogeneousEnum,
  enumRegexDefinitions.namedConstEnum,
  enumRegexDefinitions.namedRuntimeEnum,
  enumRegexDefinitions.namedCompileTimeEnum,
  enumRegexDefinitions.namedReverseMappingEnum,
  enumRegexDefinitions.namedOpenEndedEnum
]

/**
 *
 *
 * @name exportDefinitionList
 * @type {string}
 * @description This contains all the export definitions
 */

export const exportDefinitionList = [
  ...defaultExportDefinitionList,
  ...namedExportDefinitions
]

/**
 *
 *
 * @name namedInterfaceTypeExportsDefinitions
 * @type {string}
 * @description This is a array of all the named type exports that are supported for interfaces
 */

export const namedInterfaceTypeExportsDefinitions: RegExp[] = [
  typescriptInterfaceRegexDefinitions.basicNamedInterfaceExport,
  typescriptInterfaceRegexDefinitions.classTypeInterfaceNamedExport,
  typescriptInterfaceRegexDefinitions.functionTypeInterfaceNamedExport,
  typescriptInterfaceRegexDefinitions.indexableTypesNamedExport,
  typescriptInterfaceRegexDefinitions.extendingInterfacesNamedExport,
  typescriptInterfaceRegexDefinitions.hybridTypesNamedExport,
  typescriptInterfaceRegexDefinitions.genericInterfaceNamedExport
]

/**
 *
 *
 * @name namedTypeExportsDefinitions
 * @type {string}
 * @description This is a array of all the named type exports that are supported for interfaces and types
 */

export const namedTypeExportsDefinitions: RegExp[] = [
  typescriptTypeRegexDefinitions.anyTypeNamedExport,
  typescriptTypeRegexDefinitions.arrayTypeNamedExport,
  typescriptTypeRegexDefinitions.basicTypesNamedExport,
  typescriptTypeRegexDefinitions.conditionalTypeNamedExport,
  typescriptTypeRegexDefinitions.enumTypeNamedExport,
  typescriptTypeRegexDefinitions.functionTypeNamedExport,
  typescriptTypeRegexDefinitions.genericTypeNamedExport,
  typescriptTypeRegexDefinitions.indexSignatureNamedExport,
  typescriptTypeRegexDefinitions.intersectionTypeNamedExport,
  typescriptTypeRegexDefinitions.literalTypeNamedExport,
  typescriptTypeRegexDefinitions.mappedTypeNamedExport,
  typescriptTypeRegexDefinitions.neverTypeNamedExport,
  typescriptTypeRegexDefinitions.objectTypeNamedExport,
  typescriptTypeRegexDefinitions.tupleTypeNamedExport,
  typescriptTypeRegexDefinitions.unionTypeNamedExport,
  typescriptTypeRegexDefinitions.unknownTypeNamedExport,
  typescriptTypeRegexDefinitions.utilityTypeNamedExport,
  typescriptTypeRegexDefinitions.voidTypeNamedExport
]

/**
 *
 *
 * @name defaultExportTypeExportsDefinitions
 * @type {string}
 * @description This is a array of all the default type exports that are supported for interfaces and types
 */

export const defaultExportTypeExportsDefinitions: RegExp[] = [
  typescriptTypeRegexDefinitions.anyTypeDefaultExport,
  typescriptTypeRegexDefinitions.arrayTypeDefaultExport,
  typescriptTypeRegexDefinitions.basicTypesDefaultExport,
  typescriptTypeRegexDefinitions.conditionalTypeDefaultExport,
  typescriptTypeRegexDefinitions.enumTypeDefaultExport,
  typescriptTypeRegexDefinitions.functionTypeDefaultExport,
  typescriptTypeRegexDefinitions.genericTypeDefaultExport,
  typescriptTypeRegexDefinitions.indexSignatureDefaultExport,
  typescriptTypeRegexDefinitions.intersectionTypeDefaultExport,
  typescriptTypeRegexDefinitions.literalTypeDefaultExport,
  typescriptTypeRegexDefinitions.mappedTypeDefaultExport,
  typescriptTypeRegexDefinitions.neverTypeDefaultExport,
  typescriptTypeRegexDefinitions.objectTypeDefaultExport,
  typescriptTypeRegexDefinitions.tupleTypeDefaultExport,
  typescriptTypeRegexDefinitions.unionTypeDefaultExport,
  typescriptTypeRegexDefinitions.unknownTypeDefaultExport,
  typescriptTypeRegexDefinitions.utilityTypeDefaultExport,
  typescriptTypeRegexDefinitions.voidTypeDefaultExport
]

/**
 *
 *
 * @name defaultExportInterfacesTypeExportsDefinitions
 * @type {string}
 * @description This is a array of all the default type exports that are supported for interfaces
 */

export const defaultExportInterfacesTypeExportsDefinitions: RegExp[] = [
  typescriptInterfaceRegexDefinitions.basicDefaultInterfaceExport,
  typescriptInterfaceRegexDefinitions.classTypeInterfaceDefaultExport,
  typescriptInterfaceRegexDefinitions.functionTypeInterfaceDefaultExport,
  typescriptInterfaceRegexDefinitions.indexableTypesDefaultExport,
  typescriptInterfaceRegexDefinitions.extendingInterfacesDefaultExport,
  typescriptInterfaceRegexDefinitions.hybridTypesDefaultExport,
  typescriptInterfaceRegexDefinitions.genericInterfaceDefaultExport
]
