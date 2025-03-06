import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import { store } from './shared/store/store'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routesArr } from './shared/routes/routes'
import { createFetchRequest } from './entry-server.utils'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routesArr)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
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
  }
}
