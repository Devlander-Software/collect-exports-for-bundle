"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExportsFromDir = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const has_valid_extension_1 = require("./has-valid-extension");
function generateExportsFromDir(startPath, config) {
    let results = [];
    if (!fs.existsSync(startPath)) {
        console.log("Directory does not exist:", startPath);
        return results;
    }
    const files = fs.readdirSync(startPath);
    console.log(`Reading files from directory: ${startPath}`);
    console.log("Found", files.length, "files:", JSON.stringify(files));
    for (const file of files) {
        const filename = path_1.default.join(startPath, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            // Skip if the directory is in the excludeFolders list
            if (config.excludeFolders && config.excludeFolders.includes(file)) {
                console.log(`Excluding folder: ${file}`);
                continue;
            }
            // Recursively generate exports for subdirectories
            results = results.concat(generateExportsFromDir(filename, config));
        }
        else if ((0, has_valid_extension_1.fileHasValidExtension)(filename, config) && !filename.endsWith('index.ts') && !filename.endsWith('index.tsx')) {
            const relativePath = `./${path_1.default.relative(config.directory, filename).replace(/\\/g, '/')}`;
            const withoutExtension = relativePath.substr(0, relativePath.lastIndexOf('.'));
            const componentName = path_1.default.basename(filename, path_1.default.extname(filename));
            results.push(`/**\n * TSDoc for ${componentName}\n */`);
            results.push(`export * from "${withoutExtension}";`);
            console.log(picocolors_1.default.green(`Exported: ${picocolors_1.default.bold(componentName)} from ${picocolors_1.default.blue(relativePath)}`));
        }
        else {
            console.log(`Excluding from valid file paths: ${filename}`);
        }
    }
    return results;
}
exports.generateExportsFromDir = generateExportsFromDir;
//# sourceMappingURL=generate-exports-from-dir.js.map