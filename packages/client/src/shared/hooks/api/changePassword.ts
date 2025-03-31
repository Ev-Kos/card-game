import type { AxiosError } from 'axios'

import { getEndPoint } from './getEndPoint'
import { axiosInstance } from './axiosInstance'

export const changeUserPassword = async (data: Record<string, string>) => {
  try {
    const result = await axiosInstance.put(
      getEndPoint('user', 'password'),
      data,
    )
    return result
  } catch (e) {
    return e as AxiosError
  }
}
