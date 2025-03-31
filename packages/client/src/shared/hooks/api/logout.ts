import { getEndPoint } from './getEndPoint'
import { axiosInstance } from './axiosInstance'
import type { AxiosError } from 'axios'

export const logout = async () => {
  try {
    const result = await axiosInstance.post(getEndPoint('auth', 'logout'))
    return result
  } catch (e) {
    return e as AxiosError
  }
}
