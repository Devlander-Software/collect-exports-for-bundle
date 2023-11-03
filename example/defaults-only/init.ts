
  
  // @ts-ignore
  (function () {
    const path = require('path')
    const autoExporter = require('@devlander/collect-exports-for-bundle').default
const correctPath = path.resolve(__dirname, '.')

  
    const webExtensions = [
      ".web",
    ]
  
    const nativeExtensions = [
      ".native",
    ]
  
    const sharedAllowedExtensions = [
      ".ts",
      ".tsx",
      ".types",
      ".provider",
      ".enum",
      ".interface",
      ".props",
      ".type",
      ".styles"
    ]
  
    const sharedIgnoredExtensions = [
      ".test.ts",
      ".test.tsx",
      ".d.ts",
      ".stories.tsx",
      ".stories.ts",
    ]





  // This is for exporting the web index file
  autoExporter({
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index",
    exportMode: "named",
    bundleAsFunctionForDefaultExportAs: "exportAndBundle",
    allowedExtensions: [
      ...sharedAllowedExtensions,
      ...webExtensions,
    ],
    ignoredExtensions: [
      ...nativeExtensions,
      ...sharedIgnoredExtensions,
    ],
  });


  // This should give a typescript error since the exportMode is set to 'named'
  // but the bundleAsFunctionForDefaultExportAs is defined
  autoExporter({
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index",
    exportMode: "named",
    bundleAsFunctionForDefaultExportAs: "exportAndBundle",
    allowedExtensions: [
      ...sharedAllowedExtensions,
      ...webExtensions,
    ],
    ignoredExtensions: [
      ...nativeExtensions,
      ...sharedIgnoredExtensions,
    ],
  });

}());


