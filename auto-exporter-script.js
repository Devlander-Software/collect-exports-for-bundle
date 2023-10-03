const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let directory = 'src';  // default starting directory
let defaultExportFile = 'some-file-name-to-export-as-default.ts'; // default file to use default export

const includeExtensions = ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts', '.table.ts'];
const excludeExtensions = ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts', '.styles.tsx', '.styles.ts'];

// Function to handle command line flags
function handleCommandLineArgs() {
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '-d':
            case '--directory':
                directory = args[i + 1];
                i++;
                break;
            case '-de':
            case '--default-export':
                defaultExportFile = args[i + 1];
                i++;
                break;
        }
    }
}

handleCommandLineArgs();

function fileHasValidExtension(filename) {
    for (const exclExtension of excludeExtensions) {
        if (filename.endsWith(exclExtension)) {
            return false;
        }
    }
    for (const extension of includeExtensions) {
        if (filename.endsWith(extension)) {
            return true;
        }
    }
    return false;
}

function generateExportsFromDir(startPath) {
    let results = [];

    if (!fs.existsSync(startPath)) {
        console.log("Directory does not exist: ", startPath);
        return results;
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            results = results.concat(generateExportsFromDir(filename));
        } else if (fileHasValidExtension(filename) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
            const relativePath = './' + path.relative(directory, filename).replace(/\\/g, '/');
            const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));
            
            if (relativePath === `./${defaultExportFile}`) {
                const exportName = path.basename(defaultExportFile).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''); 
                results.push(`export { default as ${exportName} } from "${withoutExtension}";`);
            } else {
                results.push(`export * from "${withoutExtension}";`);
            }
            
            const componentName = path.basename(filename, path.extname(filename));
            console.log(chalk.green(`Exported: ${chalk.bold(componentName)} from ${chalk.blue(relativePath)}`));
        }
    }
    return results;
}

const exportsList = generateExportsFromDir(directory);
fs.writeFileSync(path.join(directory, 'index.ts'), exportsList.join('\n'));

console.log(chalk.bgGreen.black("\nExports generated in index.ts\n"));
