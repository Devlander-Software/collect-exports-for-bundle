import * as fs from 'fs'
import path from 'path'
import { green, red, yellow } from 'picocolors'
import { ModuleExportOptions } from '../types/types'
import { collectPaths } from './collect-paths'
import { colorLog } from './color-log'
import { fileHasValidExtension } from './has-valid-extension'

export function generateExportsFromDir(
  rootDir: string,
  config: ModuleExportOptions
): string[] {
  console.log(green('Starting export generation from directory...'))
  const collectedPaths: string[] = collectPaths(rootDir, config)
  const distinctPaths = [...new Set(collectedPaths)]
  return generateExportsFromPaths(distinctPaths, config)
}

function hasNamedExports(fileContent: string): boolean {
  return /export\s+(?!default)/.test(fileContent)
}

function hasDefaultExport(fileContent: string): boolean {
  return /export default/.test(fileContent)
}

export function extractDefaultExportVariable(filepath: string): string | null {
  console.log(green(`Extracting default export from ${filepath}...`))
  const fileContent = fs.readFileSync(filepath, 'utf-8')
  const defaultExportMatch = fileContent.match(/export default (\w+)/)
  return defaultExportMatch ? defaultExportMatch[1] : null
}

export function generateExportsFromPaths(
  paths: string[],
  config: ModuleExportOptions
): string[] {
  const { targetVersion } = config
  if (!targetVersion) {
    colorLog('Target version is required', 'red')
    colorLog('Using ES6 as default target version', 'green')
    config.targetVersion = 'es6'
  }
  console.log(green('Generating exports from provided paths...'))
  const results: string[] = []
  const defaultExportString: string[] = []
  if (!config.rootDir || config.rootDir === '') {
    throw new Error('Directory is required')
  }

  for (const filename of paths) {
    const fileContent = fs.readFileSync(filename, 'utf-8')
    const relativePath = `./${path
      .relative(config.rootDir, filename)
      .replace(/\\/g, '/')}`
    const withoutExtension = relativePath.substring(
      0,
      relativePath.lastIndexOf('.')
    )
    const componentName = path.basename(filename, path.extname(filename))

    if (config.specificFiles && config.specificFiles.includes(filename)) {
      console.log(yellow(`Processing included file: ${filename}...`))
      if (
        filename.endsWith(config.primaryExportFile || '') &&
        hasDefaultExport(fileContent)
      ) {
        const defaultVariable = extractDefaultExportVariable(filename)
        if (defaultVariable) {
          if (targetVersion === 'es6') {
            defaultExportString.push(
              `import ${defaultVariable} from "${withoutExtension}";`
            )
            defaultExportString.push(`export default ${defaultVariable};`)
          } else {
            defaultExportString.push(
              `const ${defaultVariable} = require("${withoutExtension}").default;`
            )
            defaultExportString.push(
              `module.exports.default = ${defaultVariable};`
            )
          }
        } else {
          console.error(
            red(`Failed to extract default export from ${filename}.`)
          )
        }
      } else if (hasNamedExports(fileContent) && targetVersion) {
        results.push(
          generateExportStatement(
            componentName,
            withoutExtension,
            targetVersion
          )
        )
      }
    } else if (
      fileHasValidExtension(filename, config) &&
      hasNamedExports(fileContent) &&
      targetVersion
    ) {
      results.push(
        generateExportStatement(componentName, withoutExtension, targetVersion)
      )
    }
  }

  return [...results, ...defaultExportString]
}

function generateExportStatement(
  componentName: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6'
): string {
  if (targetVersion === 'es6') {
    return `/**\n * TSDoc for ${componentName}\n */\nexport * from "${withoutExtension}";`
  } else {
    return `/**\n * TSDoc for ${componentName}\n */\nconst ${componentName} = require("${withoutExtension}");\nexports.${componentName} = ${componentName};`
  }
}
