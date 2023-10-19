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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const auto_exporter_1 = require("../auto-exporter");
jest.mock('fs');
describe('autoExporter', () => {
    beforeEach(() => {
        process.argv = []; // Reset any command-line arguments
    });
    describe('fileHasValidExtension', () => {
        it('should correctly identify valid extensions', () => {
            const mockOptions = {
                directory: 'src',
                includeExtensions: ['.ts', '.tsx'],
                excludeExtensions: ['.test.ts', '.spec.ts']
            };
            expect((0, auto_exporter_1.fileHasValidExtension)('file.ts', mockOptions)).toBe(true);
            expect((0, auto_exporter_1.fileHasValidExtension)('file.test.ts', mockOptions)).toBe(false);
            expect((0, auto_exporter_1.fileHasValidExtension)('file.jsx', mockOptions)).toBe(false);
        });
    });
    describe('generateExportsFromDir', () => {
        it('should generate correct export statements', () => {
            fs.existsSync.mockReturnValue(true);
            fs.readdirSync.mockReturnValue(['file.ts', 'file.test.ts', 'folder']);
            fs.lstatSync.mockImplementation((path) => {
                return {
                    isDirectory: () => path === 'folder'
                };
            });
            const mockOptions = {
                directory: 'src',
                includeExtensions: ['.ts', '.tsx'],
                excludeExtensions: ['.test.ts', '.spec.ts']
            };
            const exports = (0, auto_exporter_1.generateExportsFromDir)('src', mockOptions);
            expect(exports).toContain('export * from "./file";');
            expect(exports).not.toContain('export * from "./file.test";');
        });
    });
    // ... More tests for other functionalities.
});
//# sourceMappingURL=auto-exporter.test.js.map