import madge from 'madge'
import { AutoExporterOptions } from '../types/module-exporter.types'

export const checkForCircularDeps = async (
  config: AutoExporterOptions
): Promise<string[]> => {
  const circularCheckList: string[] = []
  // Check for circular dependencies before proceeding
  const circular = await madge(config.rootDir).then((res) => res.circular())
  if (circular.length) {
    // Handle the circular dependencies (e.g., log them and throw an error)
    console.error('Circular dependencies detected:', circular)
    throw new Error('Circular dependencies detected')
  }

  return circularCheckList
}
