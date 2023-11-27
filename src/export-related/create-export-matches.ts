import { getExportedFunctionNamesByFilePath } from './get-exported-function-names-by-filepath'
import { getExportedTypeDeclarationsByFilePath } from './get-exported-type-declarations-by-filepath'

// Define the MatchItem interface
export interface MatchItem {
  path: string
  functionNames?: string[]
  functionTypes?: string[]
}

// Function to create an array of MatchItem objects for both functions and types
export function createExportMatches(
  filePaths: string[],
  usedFunctionNames: Set<string>,
  usedFunctionTypes: Set<string>
): MatchItem[] {
  return filePaths.map((filePath) => {
    let functionNames = getExportedFunctionNamesByFilePath(filePath)
    let functionTypes = getExportedTypeDeclarationsByFilePath(filePath)

    // Filter out function names that are already used
    functionNames = functionNames.filter(
      (fnName) => !usedFunctionNames.has(fnName)
    )
    // Update the set of used function names
    functionNames.forEach((fnName) => usedFunctionNames.add(fnName))

    // Filter out function types that are already used
    functionTypes = functionTypes.filter(
      (fnType) => !usedFunctionTypes.has(fnType)
    )
    // Update the set of used function types
    functionTypes.forEach((fnType) => usedFunctionTypes.add(fnType))

    return { path: filePath, functionNames, functionTypes }
  })
}
