export const getFileNameFromExtension = (
  fileNameWithExtension: string,
  removeComplexExtension?: boolean
): string => {
  if (!fileNameWithExtension) return ''

  const parts = fileNameWithExtension.split('.')
  if (parts.length === 1) {
    // File name without extension
    return fileNameWithExtension
  }

  if (typeof removeComplexExtension !== 'undefined' && removeComplexExtension) {
    // Remove complex extension (e.g., 'myfile.native.ts' -> 'myfile')
    return parts[0]
  } else {
    // Remove simple extension, keep complex part (e.g., 'myfile.native.ts' -> 'myfile.native')
    return parts.slice(0, -1).join('.')
  }
}
