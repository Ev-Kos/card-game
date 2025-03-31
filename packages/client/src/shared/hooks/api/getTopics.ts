import { getEndPoint } from './getEndPoint'
import { axiosInstanceServerNode } from './axiosInstance'

import type { AxiosError } from 'axios'

export type TTopic = {
  id: string
  author_login: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  comments_count?: number
}

export const getTopicsData = async (limit: number, offset: number) => {
  try {
    const result = await axiosInstanceServerNode.get<TTopic[]>(
      getEndPoint('forum'),
      {
        params: {
          limit,
          offset,
        },
      },
    )
    return result
  } catch (e) {
    return e as AxiosError
  }
}
