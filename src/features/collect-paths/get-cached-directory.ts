import * as fs from 'fs/promises'
export const getCachedDirectory = async (
  filename: string,
  config?: { debug?: boolean }
): Promise<boolean> => {
  try {
    const result = (await fs.lstat(filename)).isDirectory()
    if (config?.debug)
      console.log(`Is directory in getCachedDirectory: ${result}`)
    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error accessing file/folder getCachedDirectory "${filename}":`,
        error.message
      )
    }

    return false
  }
}
