import { logMessageForFunction } from '../utils/log-with-color'
import { getExportedFunctionNamesByFileContent } from './get-exported-function-names-by-filecontent'
import { getExportedTypeDeclarationsByFileContent } from './get-exported-type-declarations-by-filecontent'
import { hasDefaultExport } from './has-default-export'
import { hasNamedExports } from './has-named-exports'

export const hasNoExports = (fileContent: string, debug?: boolean): boolean => {
  const exportFunctionNames = getExportedFunctionNamesByFileContent(
    fileContent,
    [],
    debug
  )
  console.log(exportFunctionNames, 'exportFunctionNames')
  const exportTypeNames = getExportedTypeDeclarationsByFileContent(
    fileContent,
    [],
    debug
  )
  console.log(exportFunctionNames, 'exportFunctionNames')
  const hasNamed = hasNamedExports(fileContent, debug)
  const hasDefault = hasDefaultExport(fileContent, debug)

  if (debug) {
    logMessageForFunction('hasNoExports', {
      hasNamed,
      hasDefault,
      fileContent
    })
  }
  return (
    !hasNamed &&
    !hasDefault &&
    !exportFunctionNames.length &&
    !exportTypeNames.length
  )
}
