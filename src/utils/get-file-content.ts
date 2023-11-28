import fs from 'fs'
import { isFilePath } from '../constraints/is-file-path'

export const getFileContent = (filePath: string): string => {
  try {
    if (!isFilePath(filePath)) {
      throw new Error(`getFileContent: ${filePath} is not a valid file path`)
    }

    if (!fs.existsSync(filePath)) {
      return ''
    } else {
      const result = fs.readFileSync(filePath, 'utf8')
      if (result) {
        return result
      } else {
        return ''
      }
    }
  } catch (error) {
    throw error as Error
  }
}
