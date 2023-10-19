"use strict";
// File:  index.ts (TypeScript)
// GitHub Gist URL: https://gist.github.com/landonwjohnson/6c444d07e8686711347fa474dd5540f5
// Location: external-modules/auto-exporter-script/auto-exporter.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoExporter = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pc = __importStar(require("picocolors"));
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
            }
            else if (fileHasValidExtension(filename) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
                const relativePath = `./${path.relative(config.directory, filename).replace(/\\/g, '/')}`;
                const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));
                const componentName = path.basename(filename, path.extname(filename));
                results.push(`/**\n * TSDoc for ${componentName}\n */`);
                results.push(`export * from "${withoutExtension}";`);
                console.log(pc.green(`Exported: ${pc.bold(componentName)} from ${pc.blue(relativePath)}`));
            }
            else {
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
exports.autoExporter = autoExporter;
//# sourceMappingURL=auto-exporter.js.map