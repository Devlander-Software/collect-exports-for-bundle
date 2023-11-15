export function sliceIntoChunks(arr: any[], chunkSize: number) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

