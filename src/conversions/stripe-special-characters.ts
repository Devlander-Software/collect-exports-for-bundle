import { regexDefinitions } from '../constraints/regex-definitions'

// containsSpecialChar: /[^a-zA-Z0-9]/,
export function stripSpecialCharacters(str: string): string {
  const { containsSpecialChar } = regexDefinitions
  if (str.includes(' ')) {
    str = str.replace(/ /g, '')
  }

  // if there is any pound sign, dollar sign, or percent sign, remove it
  if (str.includes('#') || str.includes('$') || str.includes('%')) {
    str = str.replace(/[#$%]/g, '')
  }

  // it should also be able to remove $%^&*()-_=+[]{};:'\",.<>/?\\|`~"

  return str.replace(containsSpecialChar, '')
}

// FAIL  __tests__/stripe-special-characters.test.ts
// ● stripSpecialCharacters › removes special characters from a string

//   expect(received).toBe(expected) // Object.is equality

//   Expected: "HelloWorld2021"
//   Received: "HelloWorld# $2021%"
