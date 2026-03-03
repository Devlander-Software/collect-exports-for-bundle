/* eslint-disable no-var */
const _myLocalConstFunc = (): string => {
  return 'Hello World'
}

function _myLocalFuncFunc(): string {
  return 'Hello World'
}

var _myLocalVarFunc = function (): string {
  return 'Hello World'
}

const _myLocalLetFunc = function (): string {
  return 'Hello World'
}

class _MyLocalClass {
  myLocalFunc(): string {
    return 'Hello World'
  }
}

enum _MyLocalEnum {
  myLocalValue = 'Hello World'
}
