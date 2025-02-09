import { type RouteObject } from 'react-router-dom'

import NotFoundErrorPage from '../pages/not-found-error-page'
import ServerErrorPage from '../pages/server-error-page'
import RatingPage from '../pages/rating-page'
import SignInPage from '../pages/sign-in-page'

const arrayRoutes: RouteObject[] = [
  { path: '/', element: <SignInPage /> },
  { path: '/home', element: <>HomePage</> },
  { path: '/registration', element: <>RegistrationPage</> },
  { path: '/forum', element: <>ForumPage</> },
  { path: '/forum/:id', element: <>ForumTopicPage</> },
  { path: '/game', element: <>PageGame</> },
  { path: '/leaderboard', element: <RatingPage /> },
  { path: '/profile', element: <>ProfilePage</> },
  { path: '/*', element: <NotFoundErrorPage /> },
  { path: '/error', element: <ServerErrorPage /> },
]

export default arrayRoutes
