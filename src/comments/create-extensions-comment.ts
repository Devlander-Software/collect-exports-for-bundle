export const createExtensionsComment = (
  allowedExtensions?: string[],
  ignoredExtensions?: string[]
): string => {
  // Default to empty arrays if parameters are not provided
  allowedExtensions = allowedExtensions || []
  ignoredExtensions = ignoredExtensions || []

  // Function to format extension lists
  const formatExtensions = (extensions: string[]): string =>
    extensions.map((ext) => `   * ${ext}`).join('\n')

  // Constructing the comment string
  return `
  /**
  ${
    allowedExtensions.length > 0
      ? `* Allowed Extensions:\n${formatExtensions(allowedExtensions)}\n`
      : ''
  }${
    ignoredExtensions.length > 0
      ? `   * \n * Ignored Extensions:\n${formatExtensions(
          ignoredExtensions
        )}\n`
      : ''
  }
   */
  `.trim()
}
