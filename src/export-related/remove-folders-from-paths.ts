import fs from 'fs'
import path from 'path'

export const removeFoldersFromPaths = (
  paths: string[],
  foldersToRemove: string[]
): string[] => {
  return paths.filter((p: string) => {
    const pathParts = p.split(path.sep)

    // Check if the path includes any of the foldersToRemove
    const containsFolderToRemove = pathParts.some((part) =>
      foldersToRemove.includes(part)
    )

    if (containsFolderToRemove) {
      try {
        // Check if it's a real path and a folder
        const stats = fs.statSync(p)
        return !stats.isDirectory()
      } catch (error) {
        // Error handling, e.g., path does not exist or no permission
        console.error(`Error accessing path "${p}": ${error}`)
        return false
      }
    }

    return true
  })
}
