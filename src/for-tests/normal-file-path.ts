/* eslint-disable prefer-const */

/* eslint-disable no-var */
export const myConstFunc = (): string => {
  return 'Hello World'
}

export const myConstVariable = `myValue`

export const myConstObject = {
  myConstFunc
}

export function myFuncFunc(): string {
  return 'Hello World'
}

export var myVarFunc = function (): string {
  return 'Hello World'
}

export var myVarVariable = 'myValue'

export var myVarObject = {
  myVarFunc,
  myVarVariable
}

export let myLetFunc = function (): string {
  return 'Hello World'
}

export let myLetObject = {
  myLetFunc
}

export let myLetVariable = `myValue`

export class MyClass {
  myFunc(): string {
    return 'Hello World'
  }
}

export enum MyEnum {
  myValue = 'Hello World'
}

const myConstThatWillBeExported = ''

export { myConstThatWillBeExported }
