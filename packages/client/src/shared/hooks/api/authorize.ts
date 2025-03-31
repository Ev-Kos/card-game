import { axiosInstance } from './axiosInstance'
import { getEndPoint } from './getEndPoint'

import type { AxiosError } from 'axios'

export const authorize = async (formData: Record<string, string>) => {
  try {
    const { status } = await axiosInstance.post(
      getEndPoint('auth', 'signin'),
      formData,
    )

    return status
  } catch (e) {
    const error = e as AxiosError

    return error.status
  }
}
