import { logMessageForFunction } from '../utils/log-with-color'
import { hasDefaultExport } from './has-default-export'
import { hasNamedExports } from './has-named-exports'

export const hasNoExports = (fileContent: string, debug?: boolean): boolean => {
  const hasNamed = hasNamedExports(fileContent, debug)
  const hasDefault = hasDefaultExport(fileContent, debug)
  if (debug) {
    logMessageForFunction('hasNoExports', {
      hasNamed,
      hasDefault,
      fileContent
    })
  }
  return !hasNamed && !hasDefault
}
