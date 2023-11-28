import * as fs from 'fs/promises'
import { bgRed, bold, green, white } from 'picocolors'
export const getCachedDirectory = async (
  filepath: string,
  config?: { debug?: boolean }
): Promise<boolean> => {
  try {
    const result = (await fs.lstat(filepath)).isDirectory()
    if (config?.debug) green(`Is directory in getCachedDirectory: ${result}`)
    return result
  } catch (error) {
    if (error instanceof Error) {
      bgRed(white(bold(error.message)) + ' in getCachedDirectory')
    }

    return false
  }
}
