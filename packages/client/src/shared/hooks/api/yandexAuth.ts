import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'
import type { AxiosError } from 'axios'
import { redirect_uri } from '../../../assets/assets'

type TYandexSingIn = {
  code: string
  redirect_uri: string
}

export const getServiceId = async () => {
  try {
    const result = await axiosInstance.get<{ service_id: string }>(
      getEndPoint('oauth', 'yandex', 'service-id'),
      {
        params: {
          redirect_uri: redirect_uri,
        },
      },
    )
    return result.data
  } catch (e) {
    return e as AxiosError
  }
}

export const yandexSingIn = async (data: TYandexSingIn) => {
  try {
    const result = await axiosInstance.post(
      getEndPoint('oauth', 'yandex'),
      data,
    )
    return result
  } catch (e) {
    return e as AxiosError
  }
}
