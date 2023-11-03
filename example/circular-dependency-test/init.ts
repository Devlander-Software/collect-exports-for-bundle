
  (function () {
    const path = require('path')
const correctPath = path.resolve(__dirname, '.')
    const autoExporter = require('@devlander/collect-exports-for-bundle').default

  
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
// This is for exporting the native index file
autoExporter({
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index.native",
    allowedExtensions: [
      ...nativeExtensions,
     ...sharedAllowedExtensions,
    ],
    debug: true,
    bundleAsFunctionForDefaultExportAs: "exportAndBundleNative",
    ignoredExtensions: [
      ...webExtensions,
      ...sharedIgnoredExtensions,
    ],
  });


  // This is for exporting the web index file
  autoExporter({
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index.web",
    bundleAsFunctionForDefaultExportAs: "exportAndBundleWeb",

    allowedExtensions: [
      ...sharedAllowedExtensions,
      ...webExtensions,
    ],
    ignoredExtensions: [
      ...nativeExtensions,
      ...sharedIgnoredExtensions,
    ],
  });


  // This is for exporting the web index file
  autoExporter({
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index",
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


