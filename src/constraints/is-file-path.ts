import { logFailedMessage } from '../utils/log-with-color'

export function isFilePath(path: string, debug?: boolean): boolean {
  // Adjusted regex to be more restrictive
  const regex =
    /^(?:[a-zA-Z]:\\|\\\\[a-z0-9_.$●-]+\\[a-z0-9_.$●-]+|\/)(?:[^\\/:*?"<>|\r\n]+[\\/])*[^\\/:*?"<>|\r\n]*$/

  const isPath = regex.test(path)

  if (!isPath) {
    if (debug) {
      logFailedMessage(`isFilePath: ${path}`, 'is not a valid file path')
    }
    return false
  } else {
    return true
  }
}
