import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'

const getLeaderboardSliceState = (state: RootState) => state.leaderboardSlice

export const leaderboardSelectors = {
  getLeaderboard: createSelector(
    getLeaderboardSliceState,
    state => state.leaderboard,
  ),
  getStatusFlags: createSelector(getLeaderboardSliceState, state => ({
    request: state.request,
    success: state.success,
    failed: state.failed,
  })),
}
