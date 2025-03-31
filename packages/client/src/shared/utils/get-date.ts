export const getDate = (date: string, isOnlyTime = false) => {
  const padZero = (num: number) => num.toString().padStart(2, '0')

  const dateRaw = new Date(date)
  const day = padZero(dateRaw.getDate())
  const month = padZero(dateRaw.getMonth() + 1)
  const year = dateRaw.getFullYear()
  const hour = padZero(dateRaw.getHours())
  const min = padZero(dateRaw.getMinutes())

  if (isOnlyTime) {
    return `${hour}:${min}`
  }
  return `${day}.${month}.${year}`
}
