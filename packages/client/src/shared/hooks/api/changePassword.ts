import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'
import type { AxiosError } from 'axios'

type TChangePasswordProps = {
  oldPassword: string
  newPassword: string
}

export const changeUserPassword = async (data: TChangePasswordProps) => {
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
