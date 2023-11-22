import { fileHasValidExtension } from '../extensions/has-valid-extension'
import { ConfigForCollectPathsFromDirectories } from '../features/collect-paths/collect-paths-from-directories'
import { getFileContent } from '../utils/get-file-content'
import {
  logFailedMessage,
  logMessageForFunction
} from '../utils/log-with-color'
import { hasNoExports } from './has-no-exports'

export async function getPathsWithExports(
  paths: string[],
  config: ConfigForCollectPathsFromDirectories
): Promise<string[]> {
  try {
    const directoriesChecked: string[] = []

    const distinctPaths = [...new Set(paths)] // Remove duplicates using Set

    const filteredPaths = distinctPaths.filter((path) => {
      const hasValidExtension = fileHasValidExtension(path, config)
      if (config.debug) {
        logMessageForFunction(
          'getPathsWithExports',
          {
            path,
            hasValidExtension: hasValidExtension
          },
          'yellow'
        )
      }
      if (hasValidExtension) {
        // check to see if the file has either a default export or named exports
        // if it doesn't, it's not a valid file
        const fileOutput = getFileContent(path).toString()
        console.log(fileOutput, 'this is file output')
        if (config.debug) {
          logMessageForFunction(
            'getPathsWithExports',
            {
              fileOutput
            },
            'yellow'
          )
        }
        const noExports = hasNoExports(fileOutput, config.debug)

        if (!noExports) {
          // get the directory from the path
          const directory = path.split('/').slice(0, -1).join('/')
          // check to see if the directory has already been checked
          directoriesChecked.push(directory)
          return path
        }
      }
    })

    logMessageForFunction(
      'getPathsWithExports',
      {
        distinctPaths,
        filteredPaths,
        directoriesChecked
      },
      'yellow'
    )

    return filteredPaths
  } catch (err: any) {
    logFailedMessage('collectPathsFromDirectories', err)

    return []
  }
}
