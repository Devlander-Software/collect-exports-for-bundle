#!/usr/bin/env node

/**
 * Update imports after reorganizing the codebase.
 * Run `yarn reorganize` first to generate the import update logic.
 * This script delegates to scripts/update-imports.generated.js when present.
 */

const fs = require('fs')
const path = require('path')

const generatedPath = path.join(__dirname, 'update-imports.generated.js')

if (fs.existsSync(generatedPath)) {
  require(generatedPath)
} else {
  console.error(
    "⚠️  Import update script not found. Run 'yarn reorganize' first to generate it."
  )
  process.exit(1)
}
