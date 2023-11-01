import {addSumExtra} from './files-with-extentions/addSum.extra'
import {addSumExtraNative} from './files-with-extentions/addSum.native'
import {exampleFunc} from './files-with-extentions/header.styles'
import {Platform} from './files-with-extentions/platform.enum'
import {variablesIDoNotWant} from './junk/somejunk'
import addSum from './math-functions/addSum'
import getPercentage from './math-functions/getPercentage'
import multiplyBy from './math-functions/multipleBy'
const exportAndBundleNative = {
  addSumExtra,
  addSumExtraNative,
  exampleFunc,
  Platform,
  variablesIDoNotWant,
  addSum,
  getPercentage,
  multiplyBy
}
export {addSumExtra} from './files-with-extentions/addSum.extra'
export {addSumExtraNative} from './files-with-extentions/addSum.native'
export {exampleFunc} from './files-with-extentions/header.styles'
export {Platform} from './files-with-extentions/platform.enum'
export {variablesIDoNotWant} from './junk/somejunk'
export {addSum} from './math-functions/addSum'
export {getPercentage} from './math-functions/getPercentage'
export {multiplyBy} from './math-functions/multipleBy'
export default exportAndBundleNative
export type {LoginUserDto} from './files-with-extentions/login-user.dto'
export type {UserProps} from './files-with-extentions/user.props'
export type {ModuleExportOptions} from './testing-auto-exporter'
// These are types exported from the project