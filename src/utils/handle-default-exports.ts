export function handleDefaultExports(
  arr: string[],
  defaultVariable: string,
  withoutExtension: string,
  targetVersion: 'es5' | 'es6'
) {
  if (targetVersion === 'es6') {
    arr.push(`import ${defaultVariable} from "${withoutExtension}";`)
    arr.push(`export default ${defaultVariable};`)
  } else {
    arr.push(
      `const ${defaultVariable} = require("${withoutExtension}").default;`
    )
    arr.push(`module.exports.default = ${defaultVariable};`)
  }
}
