import { getExportedDefaultFunctionsByFilePath } from './get-exported-default-function-names-by-filepath'
import { getExportedFunctionNamesByFilePath } from './get-exported-function-names-by-filepath'
import { getExportedTypeDeclarationsByFilePath } from './get-exported-type-declarations-by-filepath'

export enum ExportType {
  named = 'named',
  default = 'default'
}

export interface FuncItem {
  exportType: ExportType
  name: string
}

export interface MatchItem {
  path: string
  functionNames?: FuncItem[]
  functionTypes?: FuncItem[]
}

export function createExportMatches(
  filePaths: string[],
  usedFunctionNames: Set<string>,
  usedFunctionTypes: Set<string>
): MatchItem[] {
  return filePaths.map((filePath) => {
    let functionNames = getExportedFunctionNamesByFilePath(filePath).map(
      (name) => {
        return { name, exportType: ExportType.named } // Assuming all are named exports
      }
    )

    // Get default function names and map them as default export types
    const defaultFunctionNames = getExportedDefaultFunctionsByFilePath(
      filePath
    ).map((name) => {
      return { name, exportType: ExportType.default }
    })

    // Combine named and default exports
    functionNames = [...functionNames, ...defaultFunctionNames]

    // Filter out function names that are already used
    functionNames = functionNames.filter(
      (funcItem) => !usedFunctionNames.has(funcItem.name)
    )

    // Update the set of used function names
    functionNames.forEach((funcItem) => usedFunctionNames.add(funcItem.name))

    let functionTypes = getExportedTypeDeclarationsByFilePath(filePath).map(
      (name) => {
        return { name, exportType: ExportType.named } // Adjust if needed
      }
    )

    // Filter out function types that are already used
    functionTypes = functionTypes.filter(
      (funcItem) => !usedFunctionTypes.has(funcItem.name)
    )

    // Update the set of used function types
    functionTypes.forEach((funcItem) => usedFunctionTypes.add(funcItem.name))

    return { path: filePath, functionNames, functionTypes }
  })
}
