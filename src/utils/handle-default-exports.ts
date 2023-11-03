interface HandleDefaultExports {
  (
    arr: string[],
    defaultVariable: string,
    withoutExtension: string,
    targetVersion: 'es5' | 'es6'
  ): string[]
}

export const handleDefaultExports: HandleDefaultExports = (
  arr: string[],
  defaultVariable: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6'
) => {
  if (targetVersion === 'es6') {
    arr.push(`import ${defaultVariable} from "${withoutExtension}";`)
    arr.push(`export default ${defaultVariable};`)
  } else {
    arr.push(
      `const ${defaultVariable} = require("${withoutExtension}").default;`
    )
    arr.push(`module.exports.default = ${defaultVariable};`)
  }

  return arr
}

// // thats not what I want, I want to be able to detect definitions  for functions.
// //

// // interface FunItem {
// //   functionName: string
// //   functionType: string
// // }

// // interface DiscoverFunctionTypes {
// //   (config: AutoExporterOptions): FunItem[]
// // }

// // config contains the rootDir, allowedExtensions, and excludedFolders

// // if it checked the path "utils/handle-default-exports.ts"

// // it would find this file

// `
// interface HandleDefaultExports {
//   (
//     arr: string[],
//     defaultVariable: string,
//     withoutExtension: string,
//     targetVersion: 'es5' | 'es6'
//   ): string[]
// }

// export const handleDefaultExports: HandleDefaultExports = (
//   arr: string[],
//   defaultVariable: string,
//   withoutExtension: string,
//   targetVersion: 'es5' | 'es6'
// ) => {
//   if (targetVersion === 'es6') {
//     arr.push(`import ${defaultVariable} from "${withoutExtension}";`)
//     arr.push(`export default ${defaultVariable};`)
//   } else {
//     arr.push(
//       `const ${defaultVariable} = require("${withoutExtension}").default;`
//     )
//     arr.push(`module.exports.default = ${defaultVariable};`)
//   }

//   return arr
// }
// }
// `

// // and it would include its function name and definition in the output file.

// // discoverFunctionTypes(config) would return an array of FunItem objects, each with a functionName and functionType property
// // output would be something like this:
// // [
// //   {
// //     functionName: 'handleDefaultExports',
// //     functionType: 'HandleDefaultExports'
// //   },
// //   ]
