import { getEndPoint } from './getEndPoint'
import axiosInstance from './axiosInstance'

import type { AxiosError } from 'axios'

export type TAddUserToLeaderBoardData = {
  data: {
    login_deckMasters: string
    avatarUrl: string | null
    numberOfWins: number
  }
  ratingFieldName: string
  teamName: string
}

export type TLeaderBoardData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const addUserToLeaderBoard = async (data: TAddUserToLeaderBoardData) => {
  try {
    const result = await axiosInstance.post(getEndPoint('leaderboard'), data)

    return result
  } catch (e) {
    return e as AxiosError
  }
}

export const getLeaderBoardData = async (
  data: TLeaderBoardData,
  teamName: string,
) => {
  try {
    const result = await axiosInstance.post<
      Pick<TAddUserToLeaderBoardData, 'data'>[]
    >(getEndPoint('leaderboard', `${teamName}`), data)

    return result
  } catch (e) {
    return e as AxiosError
  }
}
