export function removeKeysWithSubstrings(
  obj: { [key: string]: any },
  substrings: string[]
): { [key: string]: any } {
  return Object.keys(obj)
    .filter((key) => !substrings.some((substring) => key.includes(substring)))
    .reduce((result: { [key: string]: any }, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}


