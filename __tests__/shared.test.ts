// parseComplexExtensionFromPath.test.ts
import path from 'path';
import { getFileContent } from '../src/utils/get-file-content';
export const pathToIndexWithDefaultExport = path.resolve(__dirname,'../src/for-tests/TestComp/index.ts');

export const pathWithInterfaceInFile = path.resolve(__dirname,'../src/types/test-options.types.ts');
export const pathWithTypesExtension = path.resolve(__dirname,'../src/types/t-color.types.ts');
export const pathWithNoExtension = path.resolve(__dirname,'../src/info');
export const pathWithDirectory = path.resolve(__dirname,'../src/types');
export const pathWithFunctionExport = path.resolve(__dirname,'../src/utils/get-duration.ts');
export const pathToFileWithDefaultExport = path.resolve(__dirname,'../src/for-tests/default-export-variable.ts');
export const pathToForTests = path.resolve(__dirname,'../src/for-tests');
export const pathWithNoExports = path.resolve(__dirname,'../src/for-tests/file-with-no-exports.ts');
export const nativeExtensionPath = path.resolve(__dirname,'../src/for-tests/myfile.native.ts');
export const webExtensionPath = path.resolve(__dirname,'../src/for-tests/myfile.web.ts');
export const normalFilePath = path.resolve(__dirname,'../src/for-tests/normal-file-path.ts');
export const fileWithJsonPath = path.resolve(__dirname,'../src/for-tests/example.json');
export const nodeModulesPath = path.resolve(__dirname,'../src/for-tests/node_modules');
export const fileContentWithType = getFileContent(pathWithTypesExtension);
export const fileContentWithFunction = getFileContent(pathWithFunctionExport);
export const fileContentWithInterface = getFileContent(pathWithInterfaceInFile);
export const fileContentWithIndexDefaultExport = getFileContent(pathToIndexWithDefaultExport);
export const fileContentWithDefaultExport = getFileContent(pathToFileWithDefaultExport);
export const pathWithJSFile = path.resolve(__dirname,'../src/for-tests/example-for-js.js');
export const pathWithJSWebFile = path.resolve(__dirname,'../src/for-tests/example-for-js.web.js');

describe('pathWithTypesExtension', () => {
    it("should include .types.ts", () => {
        expect(pathWithTypesExtension).toContain(".types.ts");
    }
    );

}   );

describe('pathWithNoExtension', () => {
    it("should not include an extension", () => {
        expect(pathWithNoExtension).not.toContain(".");
    }
    );

}   );

describe('pathWithDirectory', () => {
    it("should not include an extension", () => {
        expect(pathWithDirectory).not.toContain(".");
    }
    );

}   );


describe('pathWithFunctionExport', () => {
    it("should include .ts", () => {
        expect(pathWithFunctionExport).toContain(".ts");
    }
    );

}   );


describe('pathToFileWithDefaultExport', () => {
    it("should include .ts", () => {
        expect(pathToFileWithDefaultExport).toContain(".ts");
    }
    );

}
);

describe('pathToForTests', () => {
    it("should include .ts", () => {
        expect(pathToForTests).toContain("for-tests");
    }
    );

}
);

describe('nativeExtensionPath', () => {
    it("should include .native.ts", () => {
        expect(nativeExtensionPath).toContain(".native.ts");
    }
    );

}
);

describe('webExtensionPath', () => {
    it("should include .web.ts", () => {
        expect(webExtensionPath).toContain(".web.ts");
    }
    );

}
);

describe('normalFilePath', () => {
    it("should include .ts", () => {
        expect(normalFilePath).toContain(".ts");
    }
    );

}
);

describe('fileWithJsonPath', () => {
    it("should include .json", () => {
        expect(fileWithJsonPath).toContain(".json");
    }
    );

}
);

describe('nodeModulesPath', () => {
    it("should include node_modules", () => {
        expect(nodeModulesPath).toContain("node_modules");
    }
    );

}
);

describe('fileContentWithTypeAndEnum', () => {
    it("should include type", () => {
        expect(fileContentWithType).toContain("type");
   

    }

  
    );
    it("should include enum", () => {
        expect(fileContentWithType).toContain("enum");
    }   );
}
);


describe('fileContentWithFunction', () => {
    it("should include function", () => {
        expect(fileContentWithFunction).toContain("function");
    }
    );

}
);

