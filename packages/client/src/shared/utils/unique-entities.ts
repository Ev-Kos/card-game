export const getUniqueEntities = <T>(
  existingItems: T[],
  newItems: T[],
  valueExtractor: (item: T) => string | number,
): T[] => {
  const existingValues = new Set(existingItems.map(valueExtractor))
  return newItems.filter(item => !existingValues.has(valueExtractor(item)))
}
