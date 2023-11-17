export function dashToCamelCase(inputString: string): string {
  return (
    inputString
      // Remove non-alphanumeric characters except for dashes, underscores, and spaces
      .replace(/[^a-zA-Z0-9-_ ]/g, '')
      // Capitalize the first letter of each word following a dash, underscore, or space
      .replace(/([-_ ]\w)/g, (match) => match[1].toUpperCase())
      // Remove dashes, underscores, and spaces
      .replace(/[-_ ]/g, '')
      // Ensure the first character is lowercase
      .replace(/^./, (match) => match.toLowerCase())
  )
}
