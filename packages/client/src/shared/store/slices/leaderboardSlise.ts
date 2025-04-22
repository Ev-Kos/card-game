import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isAxiosSuccessResponse } from '../../utils/isAxiosSuccessResponse'
import {
  getLeaderBoardData,
  TAddUserToLeaderBoardData,
  TLeaderBoardData,
} from '../../hooks/api/leaderboard'
import { getUniqueEntities } from '../../utils/unique-entities'

type TLeaderboardSlice = {
  leaderboard: Pick<TAddUserToLeaderBoardData, 'data'>[]
  request: boolean
  success: boolean
  failed: boolean
}

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async ({ data, teamName }: { data: TLeaderBoardData; teamName: string }) => {
    const response = await getLeaderBoardData(data, teamName)
    if (isAxiosSuccessResponse(response, 'data')) {
      return response.data
    }
  },
)

const initialState: TLeaderboardSlice = {
  leaderboard: [],
  request: false,
  success: false,
  failed: false,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboardAction(state, action) {
      state.leaderboard = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLeaderboard.pending, state => {
      state.request = true
      state.success = false
      state.failed = false
    })

    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.success = true
      state.request = false
      if (action.payload) {
        state.leaderboard = [
          ...state.leaderboard,
          ...getUniqueEntities(
            state.leaderboard,
            action.payload,
            item => item.data.login_deckMasters,
          ),
        ]
      }
    })

    builder.addCase(fetchLeaderboard.rejected, state => {
      state.request = false
      state.failed = true
    })
  },
})

export const { setLeaderboardAction } = leaderboardSlice.actions
export default leaderboardSlice.reducer
