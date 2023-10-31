
const runExporter = () => {
    const path = require('path')
const correctPath = path.resolve(__dirname, '.')
    const {autoExporter} = require('@devlander/collect-exports-for-bundle')

    autoExporter({
        rootDir: correctPath,
        ignoredExtensions: [ '.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts', '.extra.ts', '.styles.ts'],
        excludedFolders: ['node_modules', "junk"],
    })

    autoExporter({
        rootDir: correctPath,
        allowedExtensions: ['.ts', '.tsx', '.web.ts', '.component.ts'],
        ignoredExtensions: ['.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts', '.extra.ts', '.native.ts'],
        excludedFolders: ['node_modules', "junk"],
        outputFileName: "index.web",
        outputFileExtension: ".tsx"
    })

    autoExporter({
        rootDir: correctPath,
        allowedExtensions: ['.ts', '.tsx', '.native.ts', '.component.ts'],
        ignoredExtensions: ['.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts', '.extra.ts', '.web.ts'],
        excludedFolders: ['node_modules', "junk"],
        outputFileName: "index.native",
        outputFileExtension: ".ts"
    })
}


runExporter()
