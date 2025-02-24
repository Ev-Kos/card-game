import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const getUser = (state: RootState) => state.userSlice.user

export const userSelector = createSelector([getUser], user => user)
