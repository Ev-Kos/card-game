import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routesArr } from './shared/routes/routes'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { reducer } from './shared/store/store'
import { setPageHasBeenInitializedOnServer } from './shared/store/slices/ssrSlice'
import { matchRoutes } from 'react-router-dom'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routesArr)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routesArr, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: renderToString(
      <StrictMode>
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
        </Provider>
      </StrictMode>,
    ),
    initialState: store.getState(),
  }
}
