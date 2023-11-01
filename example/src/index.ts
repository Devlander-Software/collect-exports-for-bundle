import { addSumExtra } from './files-with-extentions/addSum.extra'
import { addSumExtraWeb } from './files-with-extentions/addSum.web'
import { exampleFunc } from './files-with-extentions/header.styles'
import { variablesIDoNotWant } from './junk/somejunk'
import addSum from './math-functions/addSum'
import getPercentage from './math-functions/getPercentage'
import multiplyBy from './math-functions/multipleBy'
export { LoginUserDto } from './files-with-extentions/login-user.dto'
export { Platform } from './files-with-extentions/platform.enum'
export { UserProps } from './files-with-extentions/user.props'
const exportAndBundle = {
  addSumExtra,
  addSumExtraWeb,
  exampleFunc,
  variablesIDoNotWant,
  addSum,
  getPercentage,
  multiplyBy
}
export default exportAndBundle