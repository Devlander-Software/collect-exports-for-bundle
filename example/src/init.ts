

( async () => {
    const createExtensions = require('@devlander/collect-exports-for-bundle').createExtensions
    const autoExporter = require('@devlander/collect-exports-for-bundle').default
    const path = require('path')
    const correctPath = path.resolve(__dirname, '.')

    const {collectPathsFromDirectories} = require('@devlander/collect-exports-for-bundle')


    // testing out collect paths from directories
    const validPaths = await collectPathsFromDirectories(correctPath, {
      allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
      ignoredExtensions: [
        ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
      ],

    })  

    console.log(validPaths, 'validPaths')

    const configsToRun = [
        // Test for default exports
{
    // This is for exporting the native index file
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    exportMode: "default",
    outputFileName: "index.native",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    bundleAsFunctionForDefaultExportAs: "exportAndBundleNative",
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
},
{
    // Test for named exports
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    exportMode: "named",

    outputFileName: "index.native",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
},

{
    // Test for both
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "testing-export-mode-set-as-both-without-bundle-as-function",
    exportMode: "both",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
},

{
    // This is for exporting the native index file
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "index.native",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
},
{
    // Test for named exports when there is a primary export file
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    primaryExportFile: "index.native",
    exportMode: "named",
    outputFileName: "index.native",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
},

{
    // Test for both
    rootDir: correctPath,
    outputFilenameExtension: ".ts",
    outputFileName: "testing-export-mode-set-as-both-with-bundle-as-function",
    allowedExtensions: createExtensions("web", [], [".ts", ".tsx"]),
    bundleAsFunctionForDefaultExportAs: "exportAndBundleNative",
    ignoredExtensions: [
      ...createExtensions("native", ["test", "stories", "component"], [".ts", ".tsx"])
    ],
}

    ]


    configsToRun.forEach((config) => {
        autoExporter(config)
    })

})()


