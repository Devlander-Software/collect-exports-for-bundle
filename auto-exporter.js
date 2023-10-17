// File:  index.js (JavaScript)
// GitHub Gist URL: https://gist.github.com/landonwjohnson/6c444d07e8686711347fa474dd5540f5
// Location: external-modules/auto-exporter-script/auto-exporter.js

const fs = require('fs');
const path = require('path');
const pc = require('picocolors');

/**
 * @function autoExporter
 * @param {Object} [options] - Configuration options for the exporter.
 * @param {string} [options.directory='src'] - The directory to scan.
 * @param {string} [options.defaultExportFile=''] - Default export file name.
 * @param {string[]} [options.includeExtensions=['.ts', '.tsx', ...]] - File extensions to include.
 * @param {string[]} [options.excludeExtensions=['.stories.tsx', '.stories.ts', ...]] - File extensions to exclude.
 */
function autoExporter(options = {}) {
  const config = {
    directory: options.directory || 'src',
    defaultExportFile: options.defaultExportFile || '',
    includeExtensions: options.includeExtensions || ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts', '.table.ts'],
    excludeExtensions: options.excludeExtensions || ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts', '.styles.tsx', '.styles.ts', '.keys.ts']
  };

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
    console.log(pc.cyan("Updated Configuration after processing command-line args:"), JSON.stringify(config, null, 2));
  }

  function fileHasValidExtension(filename) {
    const isIncluded = config.includeExtensions.some(ext => filename.endsWith(ext));
    const isExcluded = config.excludeExtensions.some(ext => filename.endsWith(ext));

    console.log(`Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`);

    return isIncluded && !isExcluded;
  }

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

        console.log(pc.green(`Exported: ${pc.bold(componentName)} from ${pc.blue(relativePath)}`));
      } else {
        console.log(`Excluding from valid file paths: ${filename}`);
      }
    }

    return results;
  }

  console.log("Starting auto-exporter script");
  console.log(pc.cyan("Current Configuration:"), JSON.stringify(config, null, 2));

  handleCommandLineArgs();

  const exportsList = generateExportsFromDir(config.directory);
  fs.writeFileSync(path.join(config.directory, 'index.ts'), exportsList.join('\n'));
  console.log(pc.green("\nExports generated in index.ts\n"));
}

module.exports = {
  autoExporter
};
