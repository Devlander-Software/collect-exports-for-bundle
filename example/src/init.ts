
enum FoldersForResults {
  web = "web",
  native = "native",
  normal = "normal",
}

enum FileNamePartOne {
  defaultExports = "defaultExports",
  namedExports = "namedExports",
  defaultAndNamedExports = "defaultAndNamedExports",
  bundleAsObjectForDefaultExport = "bundleAsObjectForDefaultExport",
}

interface AutoExportPartialOptions  {
  outputFilenameExtension: string;
  allowedExtensions: string[];
  ignoredExtensions: string[];
  outputFileName: string;
  excludedFolders?: string[];
  bundleAsFunctionForDefaultExportAs?: string;
  exportMode?: 'named' | 'default' | 'both';
  debug?: boolean;
  description?: string;
  title?: string;
  excludeSpecificFiles?: string[];
  packageName: string;
}

interface CompleteAutoExportConfig extends Omit<AutoExportPartialOptions, 'packageName'> {
  rootDir: string;

}

const outputFileNames: string[] = [];

const path = require('path');
const { createExtensions, collectExportsForBundle, collectPathsFromDirectories, toCamelCase } = require('@devlander/collect-exports-for-bundle');

const getPathForPackageName = (packageName: string) => {
  return `./packages/@devlander/${packageName}`
}

const createConfigForPackage = (packageName: string): CompleteAutoExportConfig[] => {
  const correctPath = path.resolve(__dirname, '.');
  const ignoredWords = ["test", "stories", "spec", "script"];
  const allowedWords = ["component", "interface", "enum", "types", "type",  "utils", "helpers", "constants", "config", "configurations", "configuration", "configs", "configurations", "config", "defaults", "provider"];

  const createExtensionsWrapper = (folder: string, words: string[], extensions: string[]) => {
    return createExtensions(folder, words, extensions);
  }

  const webExtensions = [".ts", ".tsx", ...createExtensionsWrapper("web", allowedWords, [".ts", ".tsx"])];
  const nativeExtensions = [".ts", ".tsx", ...createExtensionsWrapper("native", allowedWords, [".ts", ".tsx"])]
  const crossPlatformExtensions = [...webExtensions, ...nativeExtensions];

  const ignoredExtensions = [...createExtensionsWrapper("", ignoredWords, [".json", ".js", ".mjs", ".jsx"])];
  const excludedFolders = ["node_modules", "build", "typings", "dist"];

  const foldersToExcludeOnNative = [...excludedFolders, "web"];
  const foldersToExcludeOnWeb = [...excludedFolders, "native"];
  const excludeFilenamesToPush = [`${toCamelCase(packageName)}exportAndBundleNative.ts`, `${toCamelCase(packageName)}exportAndBundleNativeNamedExports.ts`, `${toCamelCase(packageName)}exportAndBundleWeb.ts`, `${toCamelCase(packageName)}exportAndBundleWebNamedExports.ts`];
  excludeFilenamesToPush.forEach((filename) => {
    if(!outputFileNames.includes(filename)){
      outputFileNames.push(filename);
    
    }
   
  });
  const items: AutoExportPartialOptions[] = [
    // {
    //   packageName,
    //   title: `${packageName} - Auto Export Native Default Exports for bundleAsObjectForDefaultExport`,
    //   description: `This is for exporting the native index file`,
    //   outputFilenameExtension: ".ts",
    //   exportMode: "default",
      
    //   outputFileName: `${packageName}_${FoldersForResults.native}_${FileNamePartOne.defaultExports}_${FileNamePartOne.bundleAsObjectForDefaultExport}`,
    //   allowedExtensions: nativeExtensions,
    //   excludedFolders: foldersToExcludeOnNative,
    //   bundleAsFunctionForDefaultExportAs: `${toCamelCase(packageName)}exportAndBundleNative`,
    //   ignoredExtensions: ignoredExtensions
    // },
    // {
    //   packageName,
    //   title: `${packageName} - Auto Export Native Named Exports for bundleAsObjectForDefaultExport`,
    //   description: `This is for exporting the native index file`,
    //   outputFilenameExtension: ".ts",
    //   exportMode: "named",
    //   outputFileName: `${packageName}_${FoldersForResults.native}_${FileNamePartOne.namedExports}`,
    //   allowedExtensions: nativeExtensions,
    //   excludedFolders: foldersToExcludeOnNative,
    //   bundleAsFunctionForDefaultExportAs: `${toCamelCase(packageName)}exportAndBundleNativeNamedExports`,
    //   ignoredExtensions: ignoredExtensions
    // },
    // {
    //   packageName,
    //   title: `${packageName} - Auto Export Web Named Exports`,
    //   description: `This is for exporting the web index file`,
    //   outputFilenameExtension: ".ts",
    //   exportMode: "named",
    //   outputFileName: `${packageName}_${FoldersForResults.web}_${FileNamePartOne.namedExports}`,
    //   allowedExtensions: webExtensions,
    //   excludedFolders: foldersToExcludeOnWeb,
    //   ignoredExtensions: ignoredExtensions
    // },
    {
      packageName,
      title: `${packageName} - Auto Export Web for both Named and Default Exports`,
      description: `This is for exporting the web index file`,
      outputFilenameExtension: ".ts",
      outputFileName: `${packageName}_${FoldersForResults.web}_${FileNamePartOne.defaultAndNamedExports}`,
      exportMode: "both",
      allowedExtensions: webExtensions,
      excludedFolders: foldersToExcludeOnWeb,
      ignoredExtensions: ignoredExtensions
    },
    {
      packageName,
      
      title: `${packageName} - Normal Auto Export`,
      description: `This is for exporting the normal index file`,
      outputFilenameExtension: ".ts",
      outputFileName: `${packageName}_${FoldersForResults.normal}_${FileNamePartOne.defaultAndNamedExports}`,
      allowedExtensions: crossPlatformExtensions,
      excludedFolders: excludedFolders,
      ignoredExtensions: ignoredExtensions
    }
  ];

  console.log(correctPath, 'this is correct path')

  return items.map(({ packageName, ...config }) => ({
    ...config,
    rootDir: correctPath
  }));
}

(async () => {
  const autoExporter = require('@devlander/collect-exports-for-bundle').default

  const packages = ['hooks', 'package-json-helper', 'shared-react-native-types'];

  const autoExporterConfigs = packages.map(createConfigForPackage);

  console.log(autoExporterConfigs);

  for await (const configs of autoExporterConfigs) {
    for (const config of configs) {
      try {
        config.excludeSpecificFiles = outputFileNames;
        // Example: Collecting paths from directories based on the config
   

        // Example: Using autoExporter function on each config
        await autoExporter(config);
        console.log(`Completed auto export for ${config.outputFileName}`);

        const validPaths = await collectPathsFromDirectories(config.rootDir, {
          allowedExtensions: config.allowedExtensions,
          ignoredExtensions: config.ignoredExtensions,
          excludedFolders: config.excludedFolders,
          debug: config.debug ?? false
        });

        console.log(`Collected paths for ${config.rootDir}:`, validPaths);
      } catch (error) {
        console.error(`Error processing ${config.outputFileName}:`, error);
      }
    }
  }

  // Additional logic can be added here if needed
})();