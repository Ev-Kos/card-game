import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore as useStoreBase } from 'react-redux'
import userSlice from './slices/userSlice'
import ssrSlice from './slices/ssrSlice'
import leaderboardSlice from './slices/leaderboardSlise'
import { combineReducers } from 'redux'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const reducer = combineReducers({
  userSlice,
  ssrSlice,
  leaderboardSlice,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useStore: () => typeof store = useStoreBase
