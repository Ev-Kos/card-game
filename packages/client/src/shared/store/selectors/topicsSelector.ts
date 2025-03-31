import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'

const getTopicsSliceState = (state: RootState) => state.topicsSlice

export const topicsSelectors = {
  getTopics: createSelector(getTopicsSliceState, state => state.topics),
  getStatusFlags: createSelector(getTopicsSliceState, state => ({
    request: state.request,
    success: state.success,
    failed: state.failed,
  })),
}
