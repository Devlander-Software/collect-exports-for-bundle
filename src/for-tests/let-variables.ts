type Draggable = {
  draggable: boolean
}
type Resizable = {
  resizable: boolean
}

export let uncertain: unknown
export let obj: object
export let combined: Draggable & Resizable
export let exact: 'yes' | 'no'
export type StringOrNumber = string | number
export let numbers: number[]
export let age: number
export let person: [string, number]
export let anything: any
export function logMessage(): void {}
export function throwError(): never {
  throw new Error()
}
