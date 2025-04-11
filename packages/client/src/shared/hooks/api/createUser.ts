import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'

import type { AxiosError } from 'axios'
import { TUserData } from './getUserData'

export const createUser = async (formData: Record<string, string>) => {
  try {
    const result = await axiosInstance.post<TUserData>(
      getEndPoint('auth', 'signup'),
      formData,
    )

    return result.status
  } catch (e) {
    const error = e as AxiosError
    return error.status
  }
}
