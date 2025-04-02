import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageInitArgs, PageInitContext } from '../routes/routes'
import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '../store/slices/ssrSlice'
import { store } from '../store/store'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}[\]\\/^])/g, '\\$1') + '=([^;]*)',
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  authCookie: getCookie('authCookie'),
  uuid: getCookie('uuid'),
})

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const pageInitialOnServer = useSelector(selectPageHasBeenInitializedOnServer)

  useEffect(() => {
    if (pageInitialOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
