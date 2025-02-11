export const getEndPoint = (...args: string[]): string => {
  const paths = args.map(str => {
    if (str.startsWith('/')) {
      return str.slice(1)
    }
    if (str.endsWith('/')) {
      return str.slice(0, str.length - 1)
    }
    return str
  })

  return encodeURI(paths.join('/'))
}
