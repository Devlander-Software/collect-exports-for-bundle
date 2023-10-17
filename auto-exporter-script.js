// File: auto-exporter-script.test.js (JavaScript)
// GitHub Gist URL: https://gist.github.com/landonwjohnson/2ca297f86cf9e25ae2fcc01752f80908
// Location: external-modules/auto-exporter-script/auto-exporter-script.test.js

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Configuration
 */
const config = {
  directory: 'src',
  defaultExportFile: '', // can be blank
  includeExtensions: ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts', '.table.ts'],
  excludeExtensions: ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts', '.styles.tsx', '.styles.ts', '.keys.ts']
};

/**
 * Process command line arguments to override default configuration.
 */
function handleCommandLineArgs() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-d':
      case '--directory':
        config.directory = args[i + 1];
        i++;
        break;
      case '-de':
      case '--default-export':
        config.defaultExportFile = args[i + 1];
        i++;
        break;
      case '-ie':
      case '--include-extensions':
        config.includeExtensions = args[i + 1].split(',');
        i++;
        break;
      case '-ee':
      case '--exclude-extensions':
        config.excludeExtensions = args[i + 1].split(',');
        i++;
        break;
    }
  }
}

/**
 * Check if the given filename matches the valid extension criteria.
 * @param {string} filename - The filename to check.
 * @returns {boolean} - True if valid, false otherwise.
 */
function fileHasValidExtension(filename) {
  if (config.excludeExtensions.some(ext => filename.endsWith(ext))) return false;
  return config.includeExtensions.some(ext => filename.endsWith(ext));
}

/**
 * Generate exports for all valid files in the given directory, sorted alphabetically.
 * @param {string} startPath - The starting directory.
 * @returns {string[]} - List of exports.
 */
function generateExportsFromDir(startPath) {
  let results = [];

  if (!fs.existsSync(startPath)) {
    console.log("Directory does not exist:", startPath);
    return results;
  }

  const files = fs.readdirSync(startPath);

  // Collect valid file paths
  const validFilePaths = [];

  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);

    if (!stat.isDirectory() && fileHasValidExtension(filename) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
      validFilePaths.push(filename);
    }
  }

  // Sort file paths alphabetically
  validFilePaths.sort();

  // Generate exports
  for (const filename of validFilePaths) {
    const relativePath = `./${path.relative(config.directory, filename).replace(/\\/g, '/')}`;
    const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));

    if (config.defaultExportFile && relativePath === `./${config.defaultExportFile}`) {
      const exportName = path.basename(config.defaultExportFile)
        .split('-')
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join('');
      results.push(`/**\n * TSDoc for ${exportName}\n */`);
      results.push(`export { default as ${exportName} } from "${withoutExtension}";`);
    } else {
      const componentName = path.basename(filename, path.extname(filename));
      results.push(`/**\n * TSDoc for ${componentName}\n */`);
      results.push(`export * from "${withoutExtension}";`);
    }

    const componentName = path.basename(filename, path.extname(filename));
    console.log(chalk.green(`Exported: ${chalk.bold(componentName)} from ${chalk.blue(relativePath)}`));
  }

  return results;
}

// Main Execution
handleCommandLineArgs();
const exportsList = generateExportsFromDir(config.directory);
fs.writeFileSync(path.join(config.directory, 'index.ts'), exportsList.join('\n'));
console.log(chalk.bgGreen.black("\nExports generated in index.ts\n"));
