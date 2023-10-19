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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jest = __importStar(require("jest"));
const path_1 = __importDefault(require("path"));
// Define the Jest configuration options (if not already configured in jest.config.js)
const jestConfig = {
    collectCoverage: true,
    coverageReporters: ['json'],
    coverageDirectory: path_1.default.resolve(__dirname, '..', 'coverage'),
    collectCoverageFrom: ['dist/**/*.{js}'],
    // Add other Jest options as needed
};
// Initialize and run Jest with the specified configuration
function runJest() {
    return __awaiter(this, void 0, void 0, function* () {
        const { results } = yield jest.runCLI(jestConfig, [path_1.default.resolve(__dirname)]);
        return results;
    });
}
// Main function to run tests and generate coverage reports
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield runJest();
            console.log('Tests completed successfully.');
            // Process the JSON coverage object
            const coverageObject = ((_a = results.coverageMap) === null || _a === void 0 ? void 0 : _a.data) || {};
            // Write the coverage object to a JSON file in the project's root
            const coverageJsonPath = path_1.default.resolve(__dirname, '..', 'coverage.json');
            fs_1.default.writeFileSync(coverageJsonPath, JSON.stringify(coverageObject, null, 2));
            console.log(`Coverage data has been saved to ${coverageJsonPath}`);
        }
        catch (error) {
            console.error('Error during tests:', error);
            process.exit(1);
        }
    });
}
// Call the main function to run your tests and generate coverage reports
main();
//# sourceMappingURL=run-jest-coverage.js.map