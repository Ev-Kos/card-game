import { createSlice } from '@reduxjs/toolkit'
import { TUserData } from '../../hooks/api/getUserData'

type TInitialState = {
  user: TUserData | null
}

const initialState: TInitialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserAction(state, action) {
      state.user = action.payload
    },
  },
})

export const { getUserAction } = userSlice.actions
export default userSlice.reducer
