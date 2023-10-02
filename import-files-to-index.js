const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const directory = 'src';  // starting directory

const fileExtensionsToInclude = ['.ts', '.tsx', '.type.ts', '.component.tsx', '.component.ts', '.type.tsx', '.type.ts'];
const fileExtensionsToExclude = ['.stories.tsx', '.stories.ts', '.test.tsx', '.test.ts', '.spec.tsx', '.spec.ts'];

function fileHasValidExtension(filename) {
    for (const extension of fileExtensionsToInclude) {
        if (filename.endsWith(extension)) {
            for (const exclExtension of fileExtensionsToExclude) {
                if (filename.endsWith(exclExtension)) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

function generateExportsFromDir(startPath) {
    let results = [];

    if (!fs.existsSync(startPath)) {
        console.log("Directory does not exist: ", startPath);
        return;
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
            results.push(`export * from "${withoutExtension}";`);
            
            const componentName = path.basename(filename, path.extname(filename));
            console.log(chalk.green(`Exported: ${chalk.bold(componentName)} from ${chalk.blue(relativePath)}`));
        }
    }
    return results;
}

const exportsList = generateExportsFromDir(directory);
fs.writeFileSync(path.join(directory, 'index.ts'), exportsList.join('\n'));

console.log(chalk.bgGreen.black("\nExports generated in index.ts\n"));
