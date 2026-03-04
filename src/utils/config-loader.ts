/**
 * Config file discovery and loading.
 * Looks for: --config path, .collect-exports.json, collect-exports.config.json, package.json collectExports key.
 */

import * as fs from 'fs'
import * as path from 'path'
import { ModuleExportOptions } from '../types/module-exporter.types'

const CONFIG_FILES = ['.collect-exports.json', 'collect-exports.config.json']

export interface LoadConfigOptions {
  configPath?: string
  cwd?: string
}

/**
 * Load configuration from disk.
 * Priority: configPath (if provided) > .collect-exports.json > collect-exports.config.json > package.json collectExports
 */
export function loadConfig(
  options: LoadConfigOptions = {}
): ModuleExportOptions | null {
  const cwd = options.cwd ?? process.cwd()

  if (options.configPath) {
    const resolved = path.isAbsolute(options.configPath)
      ? options.configPath
      : path.resolve(cwd, options.configPath)
    if (fs.existsSync(resolved)) {
      return readConfigFile(resolved)
    }
    return null
  }

  for (const name of CONFIG_FILES) {
    const fullPath = path.join(cwd, name)
    if (fs.existsSync(fullPath)) {
      return readConfigFile(fullPath)
    }
  }

  const pkgPath = path.join(cwd, 'package.json')
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      if (pkg.collectExports && typeof pkg.collectExports === 'object') {
        return pkg.collectExports as ModuleExportOptions
      }
    } catch {
      // ignore
    }
  }

  return null
}

function readConfigFile(filePath: string): ModuleExportOptions | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content) as ModuleExportOptions
  } catch {
    return null
  }
}
