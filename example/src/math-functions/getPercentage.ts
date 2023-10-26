export const getPercentage = (total: number, current: number) => {
  return ((current / total) * 100).toFixed(2)
}

export default getPercentage