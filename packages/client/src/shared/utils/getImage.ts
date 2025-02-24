export const resourceApi = 'https://ya-praktikum.tech/api/v2/resources'

export const getImage = (path: string): string => {
  return resourceApi + path
}
