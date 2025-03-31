import { getEndPoint } from './getEndPoint'
import { axiosInstance } from './axiosInstance'
import type { AxiosError } from 'axios'
import { TUserData } from './getUserData'

export const changeUserProfile = async (data: Partial<TUserData>) => {
  try {
    const result = await axiosInstance.put<TUserData>(
      getEndPoint('user', 'profile'),
      data,
    )
    return result.data
  } catch (e) {
    return e as AxiosError
  }
}
