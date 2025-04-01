import { getEndPoint } from './getEndPoint'
import { axiosInstanceServerNode } from './axiosInstance'
import type { AxiosError } from 'axios'
import { TTopic } from './getTopics'

export const updateTopic = async (data: Partial<TTopic>) => {
  try {
    const result = await axiosInstanceServerNode.put<TTopic>(
      getEndPoint('forum'),
      data,
    )
    return result
  } catch (e) {
    return e as AxiosError
  }
}
