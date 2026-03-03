/**
 * Interactive configuration setup (ctix-style).
 * Generates .collect-exports.json via prompts when user runs init --interactive.
 */

import * as fs from 'fs'
import * as readline from 'readline'
import { listPresets, PresetName } from '../config/presets'
import { logColoredMessage } from '../utils/log-with-color'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(promptText: string, defaultValue?: string): Promise<string> {
  const suffix = defaultValue ? ` (${defaultValue})` : ''
  return new Promise((resolve) => {
    rl.question(`${promptText}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultValue || '')
    })
  })
}

function questionBool(
  promptText: string,
  defaultValue: boolean
): Promise<boolean> {
  const defStr = defaultValue ? 'Y/n' : 'y/N'
  return question(`${promptText} [${defStr}]`, String(defaultValue)).then(
    (a) => {
      const lower = a.toLowerCase()
      if (lower === '' || lower === 'y' || lower === 'yes') return true
      if (lower === 'n' || lower === 'no') return false
      return defaultValue
    }
  )
}

export async function runInteractiveConfig(
  _cwd: string
): Promise<Record<string, unknown>> {
  logColoredMessage(
    '\n📋 Collect Exports - Interactive Configuration\n',
    'blue'
  )
  logColoredMessage(
    'Answer the prompts to create .collect-exports.json\n',
    'blue'
  )

  const presets = listPresets()
  const presetKeys = presets.map((p) => p.key)

  const usePreset = await questionBool('Use a preset as base?', true)
  let baseConfig: Record<string, unknown> = {}

  if (usePreset) {
    const presetAnswer = await question(`Preset [react]: `, 'react')
    const presetKey = presetKeys.includes(presetAnswer) ? presetAnswer : 'react'
    const { getPreset } = await import('../config/presets')
    baseConfig = getPreset(presetKey as PresetName) as Record<string, unknown>
    logColoredMessage(`  Using preset: ${presetKey}`, 'green')
  } else {
    baseConfig = {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.tsx'],
      ignoredExtensions: ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx'],
      excludedFolders: ['node_modules', 'dist', 'build'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts',
      exportMode: 'named',
      includeIndexes: false
    }
  }

  const rootDir = await question(
    'Root directory',
    String(baseConfig.rootDir ?? 'src')
  )
  if (rootDir) baseConfig.rootDir = rootDir

  const outputName = await question(
    'Output file name (without extension)',
    String(baseConfig.outputFileName ?? 'index')
  )
  if (outputName) baseConfig.outputFileName = outputName

  const useTsApi = await questionBool(
    'Use TypeScript Compiler API for accurate exports? (recommended for rollup-plugin-dts)',
    true
  )
  baseConfig.useTypeScriptAPI = useTsApi

  const barrelMode = await question(
    'Barrel mode: single or perDirectory',
    'single'
  )
  if (barrelMode === 'perDirectory') baseConfig.barrelMode = 'perDirectory'

  logColoredMessage('\n✅ Configuration complete\n', 'green')
  rl.close()

  return baseConfig
}

export function writeConfigFile(
  config: Record<string, unknown>,
  outputPath: string
): void {
  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2))
  logColoredMessage(`Configuration written to ${outputPath}`, 'green')
}
