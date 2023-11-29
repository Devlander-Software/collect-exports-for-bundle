export const createExtension = (
  mainWord: string,
  additionalWord: string,
  fileExt: string
): string => {
  // Helper function to check if the string has a leading dot and add one if not
  const ensureLeadingDot = (str: string): string =>
    str && !str.startsWith('.') ? `.${str}` : str

  mainWord = ensureLeadingDot(mainWord)
  additionalWord = ensureLeadingDot(additionalWord)
  fileExt = ensureLeadingDot(fileExt)

  return `${mainWord}${additionalWord}${fileExt}`
}
