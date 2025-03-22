export const sliceString = (
  startSimbol: string,
  endSimbol: string,
  str: string,
) => {
  const startIndex = str.indexOf(startSimbol)
  const endIndex = str.indexOf(endSimbol)

  return str.slice(startIndex + 1, endIndex)
}
