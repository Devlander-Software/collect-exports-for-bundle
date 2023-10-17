// File: auto-exporter-script.js (JavaScript)
// GitHub Gist URL: https://gist.github.com/landonwjohnson/2ca297f86cf9e25ae2fcc01752f80908
// Location: external-modules/auto-exporter-script/auto-exporter-script.js

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

  console.log(chalk.cyan("Updated Configuration after processing command-line args:"), JSON.stringify(config, null, 2));
}

/**
 * Check if the given filename matches the valid extension criteria.
 * @param {string} filename - The filename to check.
 * @returns {boolean} - True if valid, false otherwise.
 */
function fileHasValidExtension(filename) {
  const isIncluded = config.includeExtensions.some(ext => filename.endsWith(ext));
  const isExcluded = config.excludeExtensions.some(ext => filename.endsWith(ext));

  console.log(`Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`);

  return isIncluded && !isExcluded;
}

/**
 * Generate exports for all valid files in the given directory and its subdirectories.
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
  console.log(`Reading files from directory: ${startPath}`);
  console.log("Found", files.length, "files:", JSON.stringify(files));

  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      // Recursively generate exports for subdirectories
      results = results.concat(generateExportsFromDir(filename));
    } else if (fileHasValidExtension(filename) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
      const relativePath = `./${path.relative(config.directory, filename).replace(/\\/g, '/')}`;
      const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));

      const componentName = path.basename(filename, path.extname(filename));
      results.push(`/**\n * TSDoc for ${componentName}\n */`);
      results.push(`export * from "${withoutExtension}";`);

      console.log(chalk.green(`Exported: ${chalk.bold(componentName)} from ${chalk.blue(relativePath)}`));
    } else {
      console.log(`Excluding from valid file paths: ${filename}`);
    }
  }

  return results;
}

// Main Execution
console.log("Starting auto-exporter script");
console.log(chalk.cyan("Current Configuration:"), JSON.stringify(config, null, 2));

handleCommandLineArgs();

const exportsList = generateExportsFromDir(config.directory);
fs.writeFileSync(path.join(config.directory, 'index.ts'), exportsList.join('\n'));
console.log(chalk.bgGreen.black("\nExports generated in index.ts\n"));
