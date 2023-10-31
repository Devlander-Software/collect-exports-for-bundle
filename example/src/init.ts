
const runExporter = () => {
    const path = require('path')
const correctPath = path.resolve(__dirname, '.')
    const {autoExporter} = require('@devlander/collect-exports-for-bundle')

    const webExtensions = [
        ".props.web.ts",
        ".web.ts",
        ".web.tsx",
        ".web.types.ts",
        ".web.enum.ts",
        ".web.interface.ts",
        ".test.web.ts",
        ".test.web.tsx",
      ]
    
      const nativeExtensions = [
        ".native.ts",
        ".native.tsx",
        ".native.types.ts",
        ".native.enum.ts",
        ".native.interface.ts",
        ".test.native.ts",
        ".test.native.tsx",
      ]
    
      const sharedAllowedExtensions = [
        ".ts",
        ".tsx",
        ".types.ts",
        ".provider.tsx",
        ".enum.ts",
        ".interface.ts",
        ".props.ts",
        ".type.ts",
       
        ".styles.tsx",
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

}


runExporter()
