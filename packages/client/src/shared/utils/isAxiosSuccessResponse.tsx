import { AxiosError } from 'axios'

export function isAxiosSuccessResponse<T extends object>(
  data: T | AxiosError,
  successKey: keyof T,
): data is T {
  return !(data instanceof AxiosError) && successKey in data
}
