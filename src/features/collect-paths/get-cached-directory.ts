import * as fs from 'fs/promises'
export const getCachedDirectory = async (
  filepath: string,
  config?: { debug?: boolean }
): Promise<boolean> => {
  try {
    const result = (await fs.lstat(filepath)).isDirectory()
    if (config?.debug)
      console.log(`Is directory in getCachedDirectory: ${result}`)
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error accessing file/folder getCachedDirectory "${filepath}":`,
        error.message
      )
    }

    return false
  }
}
