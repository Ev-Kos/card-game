import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TSsrState = {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: TSsrState = {
  pageHasBeenInitializedOnServer: false,
}

const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer(state, action) {
      state.pageHasBeenInitializedOnServer = action.payload
    },
  },
})

export const selectPageHasBeenInitializedOnServer = (state: RootState) =>
  state.ssrSlice.pageHasBeenInitializedOnServer

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions

export default ssrSlice.reducer
