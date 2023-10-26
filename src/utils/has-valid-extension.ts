import path from 'path'
import { ModuleExportOptions } from '../types/types'

export function fileHasValidExtension(
  filePath: string,
  config: ModuleExportOptions
): boolean {
  // Get the file extension
  const ext = path.extname(filePath)

  // First, check if the file's extension is within the ignored list
  if (config.ignoredExtensions && config.ignoredExtensions.includes(ext)) {
    return false
  }

  // Then, check if the file's extension is allowed
  return Boolean(
    config.allowedExtensions && config.allowedExtensions.includes(ext)
  )
}
