import { ModuleExportOptions } from '../types/types'
export function fileHasValidExtension(
  filename: string,
  config: ModuleExportOptions
): boolean {
  if (!config.allowedExtensions || config.allowedExtensions.length === 0) {
    throw new Error('Allowed extensions are required')
  }

  if (!config.ignoredExtensions || config.ignoredExtensions.length === 0) {
    throw new Error('ignoredExtensions extensions are required')
  }
  const isIncluded = config.allowedExtensions.some((ext) =>
    filename.endsWith(ext)
  )
  const isExcluded = config.ignoredExtensions.some((ext) =>
    filename.endsWith(ext)
  )

  console.log(
    `Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`
  )

  return isIncluded && !isExcluded
}
