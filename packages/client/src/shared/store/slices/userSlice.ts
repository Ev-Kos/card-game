import { createSlice } from '@reduxjs/toolkit'
import { TUserData } from '../../shared/hooks/api/getUserData'

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
    getUser(state, action) {
      state.user = action.payload
    },
  },
})

export const { getUser } = userSlice.actions
export default userSlice.reducer
