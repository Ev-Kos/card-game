export const getUniqueEntities = <T, K extends keyof T>(
  existingItems: T[],
  newItems: T[],
  key: K,
): T[] => {
  const existingValues = new Set(existingItems.map(item => item[key]))
  return newItems.filter(item => !existingValues.has(item[key]))
}
