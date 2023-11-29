import fs from 'fs'
import { isFilePath } from '../constraints/is-file-path'
import { logMessageBasedOnCondition } from './log-with-color'

export const getFileContent = (filePath: string): string => {
  try {
    if (!isFilePath(filePath)) {
      logMessageBasedOnCondition(
        `getFileContent: ${filePath} is not a valid file path`,
        false
      )
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
    return ''
  }
}
