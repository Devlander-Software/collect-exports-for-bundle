export function toDashCase(str: string): string {
  return (
    str
      // Insert a dash before all uppercase letters and convert them to lowercase
      .replace(/([A-Z])/g, '-$1')
      // Replace any non-alphanumeric character (excluding dash) with a dash
      .replace(/[^a-zA-Z0-9-]/g, '-')
      // Convert to lowercase
      .toLowerCase()
      // Remove any leading or trailing dashes
      .replace(/^-+|-+$/g, '')
      // Remove any double dashes
      .replace(/--+/g, '-')
  )
}
