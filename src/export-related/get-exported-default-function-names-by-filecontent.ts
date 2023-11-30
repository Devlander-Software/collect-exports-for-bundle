import { logColoredMessage } from '../utils/log-with-color'
import { extractDefaultExportVariable } from './extract-default-export'

export const getExportedDefaultFunctionsByFileContent = (
  fileContent: string,
  debug?: boolean
): string[] => {
  const functionNames: string[] = []

  // check every line for a default export
  const lines = fileContent.split('\n')
  for (const line of lines) {
    const match = extractDefaultExportVariable(line)
    if (match) {
      functionNames.push(match)
    }
  }

  if (debug && functionNames.length === 0) {
    logColoredMessage(`No default exports found in file content`, 'blue')
  }

  return functionNames
}
