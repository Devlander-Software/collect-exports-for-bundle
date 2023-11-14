import * as fs from 'fs/promises' // Use the promise version of the fs module
import path from 'path'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'
import { fileHasValidExtension } from './has-valid-extension'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'

export async function collectPaths(
  startPath: string,
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): Promise<string[]> {
  let paths: string[] = []

  const absolutePath = path.resolve(startPath)

  try {
    const stat = await fs.lstat(absolutePath)

    if (!stat.isDirectory()) {
      return paths
    }
  } catch (error: any) {
    console.error(`Error accessing path "${absolutePath}":`, error.message)
    return paths
  }

  try {
    const files = await fs.readdir(absolutePath)
    for (const file of files) {
      const filename = path.join(absolutePath, file)

      // Cached directory check
      let isDirectory: boolean
      try {
        isDirectory = (await fs.lstat(filename)).isDirectory()
      } catch (error: any) {
        console.error(
          `Error accessing file/folder "${filename}":`,
          error.message
        )
        continue
      }

      if (isDirectory) {
        if (config.excludedFolders && config.excludedFolders.includes(file)) {
          continue
        }
        paths = paths.concat(await collectPaths(filename, config)) // Recursive call
      } else {
        if (['index.ts', 'index.tsx'].includes(file)) {
          continue
        }
        const fileName = parseComplexExtensionFromPath(filename)
        const validFile = fileHasValidExtension(fileName, config)

        if (!validFile) {
          continue
        }
        paths.push(filename)
      }
    }
  } catch (error: any) {
    console.error(`Error reading directory "${absolutePath}":`, error.message)
  }

  return paths
}
