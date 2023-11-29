export const filterExtension = (
  extension: string,
  filterFromExtensionsOrWords: string[]
): string | null => {
  // Split the extension into parts based on '.'
  const extensionParts = extension.split('.').filter(Boolean)

  // Iterate through each filter
  for (const filter of filterFromExtensionsOrWords) {
    // Split the filter into parts
    const filterParts = filter.split('.').filter(Boolean)

    // If the filter is a single word (not an extension), check if it's included in any part of the extension
    if (filterParts.length === 1 && filter.indexOf('.') === -1) {
      if (extensionParts.includes(filter)) {
        return null
      }
    }

    // Check if all parts of the filter are present in the extension in order
    else if (filterParts.length <= extensionParts.length) {
      const startIndex = extensionParts.length - filterParts.length
      const matchingPart = extensionParts.slice(startIndex).join('.')

      if ('.' + matchingPart === filter) {
        return null
      }
    }
  }

  // If none of the above conditions are met, return the extension
  return extension
}
