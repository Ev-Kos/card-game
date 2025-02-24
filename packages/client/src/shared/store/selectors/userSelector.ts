import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'

const getUserSliceState = (state: RootState) => state.userSlice

export const getUser = createSelector(
  getUserSliceState,
  userState => userState.user,
)
