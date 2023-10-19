"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileHasValidExtension = void 0;
function fileHasValidExtension(filename, config) {
    const isIncluded = config.includeExtensions.some(ext => filename.endsWith(ext));
    const isExcluded = config.excludeExtensions.some(ext => filename.endsWith(ext));
    console.log(`Checking file: ${filename}. Included: ${isIncluded}, Excluded: ${isExcluded}`);
    return isIncluded && !isExcluded;
}
exports.fileHasValidExtension = fileHasValidExtension;
//# sourceMappingURL=has-valid-extension.js.map