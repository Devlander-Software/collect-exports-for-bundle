import { ExportType, MatchItem } from "../src/export-related/create-export-matches";
import { processMatchItem } from "../src/export-related/process-match-item";

describe('processMatchItem', () => {
  it('should generate export statements for named exports', () => {
    const matchItem: MatchItem = {
      functionNames: [
        { name: 'func1', exportType: ExportType.named },
        { name: 'func2', exportType: ExportType.named}
      ],
      functionTypes: [],
      path: 'some/path'
    };

    const pathWithoutExtension = './src/moduleName';

    const expected = [
      "export {func1, func2} from './src/moduleName';"
    ];

    expect(processMatchItem(matchItem, pathWithoutExtension)).toEqual(expected);
  });

  it('should generate export type statements for type exports', () => {
    const matchItem: MatchItem = {
      functionNames: [],
      functionTypes: [
        { name: 'Type1', exportType: ExportType.named },
        { name: 'Type2', exportType: ExportType.named }
      ],
      path: 'some/path'
    };

    const pathWithoutExtension = './src/types';

    const expected = [
      "export type {Type1, Type2} from './src/types';"
    ];

    expect(processMatchItem(matchItem, pathWithoutExtension)).toEqual(expected);
  });


  it('it should work with default exports if folderPath is the same as function name', () => {
    const matchItem: MatchItem = {
      functionNames: [
        { name: 'ExampleFunc', exportType: ExportType.default },

      ],
      functionTypes: [
      ],
      path: './src/ExampleFunc'
    };

    const pathWithoutExtension = './src/ExampleFunc';

    const expected = [
      "import ExampleFunc from './src/ExampleFunc';",
        "export {ExampleFunc};"
    ];

    let result = processMatchItem(matchItem, pathWithoutExtension);

    expect(result).toEqual(expected);
  });


  it('it should work with default exports if folderPath is containing index in path', () => {
    const matchItem: MatchItem = {
      functionNames: [
        { name: 'ExampleFunc', exportType: ExportType.default },

      ],
      functionTypes: [
      ],
      path: './src/ExampleFunc/index'
    };

    const pathWithoutExtension = './src/ExampleFunc';

    const expected = [
      "import ExampleFunc from './src/ExampleFunc';",
      "export {ExampleFunc};"
    ];

    let result = processMatchItem(matchItem, pathWithoutExtension);

    expect(result).toEqual(expected);
  });

  it('it should be able to combine mixed exports', () => {
    const matchItem: MatchItem = {
      functionNames: [
        { name: 'ExampleFunc', exportType: ExportType.default },
        { name: 'ChildrenFunc', exportType: ExportType.named },
        { name: 'AnotherFunc', exportType: ExportType.named },
      ],
      functionTypes: [
      ],
      path: './src/ExampleFunc/index'
    };

    const pathWithoutExtension = './src/ExampleFunc';

    const expected = [
      "import ExampleFunc, {ChildrenFunc, AnotherFunc} from './src/ExampleFunc';",
      "export {ExampleFunc, ChildrenFunc, AnotherFunc};"
    ];

    let result = processMatchItem(matchItem, pathWithoutExtension);

    expect(result).toEqual(expected);
  });

  it('should handle mixed named and type exports', () => {
    const matchItem: MatchItem = {
      functionNames: [
        { name: 'func1', exportType: ExportType.named }
      ],
      functionTypes: [
        { name: 'Type1', exportType: ExportType.named }
      ],
      path: 'some/path'
    };

    const pathWithoutExtension = './src/mixed';

    const expected = [
      "export {func1} from './src/mixed';",
      "export type {Type1} from './src/mixed';"
    ];

    expect(processMatchItem(matchItem, pathWithoutExtension)).toEqual(expected);
  });

  it('should return an empty array for no exports', () => {
    const matchItem = {
      functionNames: [],
      functionTypes: [],
      path: 'some/path'
    };

    const pathWithoutExtension = './src/empty';

    expect(processMatchItem(matchItem, pathWithoutExtension)).toEqual([]);
  });

  // Add more test cases as needed for other scenarios, like default exports, index file paths, etc.
});
