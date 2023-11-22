export function dashToCamelCase(inputString: string): string {
  // if the first character is a dash, underscore, or space, remove it
  if (inputString.match(/^[-_ ]/)) {
    inputString = inputString.slice(1)
  }

  // if there is two dashes in a row, remove the first one
  if (inputString.match(/[-_ ]{2}/)) {
    inputString = inputString.replace(/[-_ ]{2}/, ' ')
  }

  if (inputString) {
    inputString = inputString.toLowerCase()
  }

  if (!inputString) {
    return ''
  } else {
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
}
