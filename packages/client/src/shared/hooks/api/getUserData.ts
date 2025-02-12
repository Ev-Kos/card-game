import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'

import type { AxiosError } from 'axios'

type TUserData = {
  id: string
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
}

export const getUserData = async () => {
  try {
    const result = await axiosInstance.get<TUserData>(
      getEndPoint('auth', 'user'),
    )

    return result
  } catch (e) {
    return e as AxiosError
  }
}
