import { getTopicsData, TTopic } from '../../hooks/api/getTopics'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isAxiosSuccessResponse } from '../../utils/isAxiosSuccessResponse'

type TTopicsSlice = {
  topics: TTopic[]
  request: boolean
  success: boolean
  failed: boolean
}

export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const response = await getTopicsData(limit, offset)
    if (isAxiosSuccessResponse(response, 'data')) {
      return response.data
    }
    return []
  },
)

const initialState: TTopicsSlice = {
  topics: [],
  request: false,
  success: false,
  failed: false,
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    getTopicsAction(state, action) {
      state.topics = [...state.topics, ...action.payload]
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTopics.pending, state => {
      ;(state.request = true), (state.success = false), (state.failed = false)
    })

    builder.addCase(fetchTopics.fulfilled, (state, action) => {
      ;(state.success = true),
        (state.request = false),
        (state.topics = [...state.topics, ...action.payload])
    })

    builder.addCase(fetchTopics.rejected, state => {
      ;(state.request = false), (state.failed = true), (state.topics = [])
    })
  },
})

export const { getTopicsAction } = topicsSlice.actions
export default topicsSlice.reducer
