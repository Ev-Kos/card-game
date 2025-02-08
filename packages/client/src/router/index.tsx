import { type RouteObject } from 'react-router-dom'

import { NotFoundErrorPage, ServerErrorPage } from '../pages'

const arrayRoutes: RouteObject[] = [
  { path: '/', element: <>any text</> },
  { path: '/home', element: <>any text</> },
  { path: '/registration', element: <>any text</> },
  { path: '/forum', element: <>any text</> },
  { path: '/forum/:id', element: <>any text</> },
  { path: '/game', element: <>any text</> },
  { path: '/leaderboard', element: <>any text</> },
  { path: '/profile', element: <>any text</> },
  { path: '/*', element: <NotFoundErrorPage /> },
  { path: '/error', element: <ServerErrorPage /> },
]

export default arrayRoutes
