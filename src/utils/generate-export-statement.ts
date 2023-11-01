import { ModuleExportOptions } from '../types/module-exporter.types'

export function generateExportStatement(
  componentName: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6',
  config: ModuleExportOptions
): string {
  console.log(`Generating export statement for ${componentName}`)
  console.log(`Target version: ${targetVersion}`)
  if (
    config.ignoredExtensions &&
    config.ignoredExtensions.includes(componentName)
  ) {
    return ''
  } else {
    if (targetVersion === 'es6') {
      return `/**\n * TSDoc for ${componentName}\n */\nexport * from "${withoutExtension}";`
    } else {
      return `/**\n * TSDoc for ${componentName}\n */\nconst ${componentName} = require("${withoutExtension}");\nexports.${componentName} = ${componentName};`
    }
  }
}
