import type { AxiosError } from 'axios'
import { axiosInstanceServerNode } from './axiosInstance'
import { getEndPoint } from './getEndPoint'
import { TTopic } from './getTopics'

export const createTopicData = async (data: Partial<TTopic>) => {
  try {
    const result = await axiosInstanceServerNode.post<TTopic[]>(
      getEndPoint('forum', 'create'),
      data,
    )
    return result.data
  } catch (e) {
    return e as AxiosError
  }
}
