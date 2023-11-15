export function videoTimeStampToSeconds(str: string): number {
  const p: any[] = str.split(':');

  let s = 0,
    m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}


