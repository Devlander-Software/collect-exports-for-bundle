export function getRange(start: number, count: number) {
  return Array.apply(0, Array(count)).map((_element, index) => index + start);
}

export default getRange;
