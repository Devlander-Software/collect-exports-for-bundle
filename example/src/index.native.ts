import { addSumExtra } from './files-with-extentions/addSum.extra'
import { addSumExtraNative } from './files-with-extentions/addSum.native'
import { exampleFunc } from './files-with-extentions/header.styles'
import { variablesIDoNotWant } from './junk/somejunk'
import addSum from './math-functions/addSum'
import getPercentage from './math-functions/getPercentage'
import multiplyBy from './math-functions/multipleBy'
export { LoginUserDto } from './files-with-extentions/login-user.dto'
export { Platform } from './files-with-extentions/platform.enum'
export { UserProps } from './files-with-extentions/user.props'
const exportAndBundleNative = {
  addSumExtra,
  addSumExtraNative,
  exampleFunc,
  variablesIDoNotWant,
  addSum,
  getPercentage,
  multiplyBy
}
export default exportAndBundleNative