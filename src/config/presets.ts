import { ModuleExportOptions } from '../types/module-exporter.types'

/**
 * Configuration presets for common use cases
 */
export const CONFIG_PRESETS = {
  // React/TypeScript project
  react: {
    name: 'React/TypeScript',
    description: 'Standard React project with TypeScript',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      ignoredExtensions: ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx', '.stories.ts', '.stories.tsx'],
      excludedFolders: ['node_modules', 'dist', 'build', 'coverage'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'named' as const,
      includeIndexes: false
    }
  },

  // Node.js library
  nodeLibrary: {
    name: 'Node.js Library',
    description: 'Node.js library with TypeScript',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.js'],
      ignoredExtensions: ['.test.ts', '.test.js', '.spec.ts', '.spec.js'],
      excludedFolders: ['node_modules', 'dist', 'build', 'coverage'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'both' as const,
      includeIndexes: false
    }
  },

  // Design system
  designSystem: {
    name: 'Design System',
    description: 'Component library with multiple platforms',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.tsx', '.component.ts', '.component.tsx'],
      ignoredExtensions: ['.test.ts', '.test.tsx', '.stories.ts', '.stories.tsx'],
      excludedFolders: ['node_modules', 'dist', 'build', 'storybook-static'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'named' as const,
      includeIndexes: false
    }
  },

  // Monorepo package
  monorepo: {
    name: 'Monorepo Package',
    description: 'Package within a monorepo structure',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.tsx'],
      ignoredExtensions: ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx'],
      excludedFolders: ['node_modules', 'dist', 'build', 'coverage', '.next'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'both' as const,
      includeIndexes: false
    }
  },

  // Utility library
  utility: {
    name: 'Utility Library',
    description: 'Collection of utility functions',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.js'],
      ignoredExtensions: ['.test.ts', '.test.js', '.spec.ts', '.spec.js'],
      excludedFolders: ['node_modules', 'dist', 'build'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'named' as const,
      includeIndexes: false
    }
  },

  // API client
  apiClient: {
    name: 'API Client',
    description: 'API client library with types',
    config: {
      rootDir: 'src',
      allowedExtensions: ['.ts', '.type.ts', '.interface.ts'],
      ignoredExtensions: ['.test.ts', '.spec.ts'],
      excludedFolders: ['node_modules', 'dist', 'build'],
      outputFileName: 'index',
      outputFilenameExtension: '.ts' as const,
      exportMode: 'both' as const,
      includeIndexes: false
    }
  }
}

export type PresetName = keyof typeof CONFIG_PRESETS

/**
 * Get a configuration preset by name
 */
export function getPreset(presetName: PresetName): ModuleExportOptions {
  return CONFIG_PRESETS[presetName].config
}

/**
 * List all available presets
 */
export function listPresets(): Array<{ name: string; key: string; description: string }> {
  return Object.entries(CONFIG_PRESETS).map(([key, preset]) => ({
    key,
    name: preset.name,
    description: preset.description
  }))
}

/**
 * Validate if a preset name is valid
 */
export function isValidPreset(presetName: string): presetName is PresetName {
  return presetName in CONFIG_PRESETS
} 