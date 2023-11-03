import { AutoExporterOptions } from '../types/module-exporter.types'
import { logColoredMessage } from './log-with-color'

export function generateExportStatement(
  componentName: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6',
  config: AutoExporterOptions
): string {
  if (config.debug) {
    logColoredMessage(
      `Generating export statement for ${componentName}`,
      'yellow'
    )
    logColoredMessage(`Target version: ${targetVersion}`, 'yellow')
  }

  if (config.exportMode === 'named' || config.exportMode === 'both') {
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
  } else {
    logColoredMessage(
      `Skipping export statement for ${componentName} since export mode is set to default only.`,
      'yellow'
    )
  }

  return ''
}
