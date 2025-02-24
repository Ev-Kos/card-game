import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'
import type { AxiosError } from 'axios'
import { TUserData } from './getUserData'

export const changeUserAvatar = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('avatar', file, file.name)
    const data = formData
    const result = await axiosInstance.put<TUserData>(
      getEndPoint('user', 'profile', 'avatar'),
      data,
    )
    return result.data
  } catch (e) {
    return e as AxiosError
  }
}
