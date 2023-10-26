
const runExporter = () => {
    const path = require('path')
const correctPath = path.resolve(__dirname, '.')
    const {autoExporter} = require('@devlander/collect-exports-for-bundle')

    autoExporter({
        rootDir: correctPath,
        primaryExportFile: 'mainExport.ts',
        ignoredExtensions: [ '.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts', '.extra.ts', '.styles.ts'],
        excludedFolders: ['node_modules', "junk"],
    })
}


runExporter()
