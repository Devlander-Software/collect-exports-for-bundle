export const getFileContent = (filePath: string): string => {
  const fs = require('fs')
  if (!fs.existsSync(filePath)) {
    return ''
  } else {
    return fs.readFileSync(filePath, 'utf8')
  }
}
