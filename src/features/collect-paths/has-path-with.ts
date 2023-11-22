import { logMessageForFunction } from '../../utils/log-with-color'

export const hasPathWith = (
  paths: string[],
  pathsToCheck: string | string[],
  debug?: boolean
): boolean => {
  let pathToCheck: string
  let hasPath = false
  if (typeof pathsToCheck === 'string') {
    pathToCheck = pathsToCheck
    hasPath = paths.includes(pathToCheck)
  } else {
    for (let i = 0; i < pathsToCheck.length; i++) {
      pathToCheck = pathsToCheck[i]
      hasPath = paths.includes(pathToCheck)
      if (hasPath) {
        break
      }
    }
  }

  if (debug) {
    logMessageForFunction('hasPathWith', { hasPath, paths })
  }

  if (hasPath) {
    return false
  } else {
    return true
  }
}
