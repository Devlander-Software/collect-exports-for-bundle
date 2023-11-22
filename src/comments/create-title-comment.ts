export function createTitleComment(
  title?: string,
  description?: string
): string {
  if (!title && !description) return ''
  const currentDate: string = new Date().toISOString().split('T')[0] // Gets the current date in YYYY-MM-DD format
  return `/**
   * Title: ${title}
   * Description: ${description}
   * Date: ${currentDate}
   */
  `
}
