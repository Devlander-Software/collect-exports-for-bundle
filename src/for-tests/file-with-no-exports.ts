/* eslint-disable no-var */
const myLocalConstFunc = (): string => {
  return 'Hello World'
}

function myLocalFuncFunc(): string {
  return 'Hello World'
}

var myLocalVarFunc = function (): string {
  return 'Hello World'
}

const myLocalLetFunc = function (): string {
  return 'Hello World'
}

class MyLocalClass {
  myLocalFunc(): string {
    return 'Hello World'
  }
}

enum MyLocalEnum {
  myLocalValue = 'Hello World'
}
