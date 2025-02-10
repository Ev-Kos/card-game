import { type RouteObject } from 'react-router-dom'

import { NotFoundErrorPage, ServerErrorPage } from '../pages'
import SignInPage from '../pages/sign-in-page'
import GamePage from '../pages/game-page'

const arrayRoutes: RouteObject[] = [
  { path: '/', element: <SignInPage /> },
  { path: '/home', element: <>HomePage</> },
  { path: '/registration', element: <>RegistrationPage</> },
  { path: '/forum', element: <>ForumPage</> },
  { path: '/forum/:id', element: <>ForumTopicPage</> },
  { path: '/game', element: <GamePage /> },
  { path: '/leaderboard', element: <>LeaderboardPage</> },
  { path: '/profile', element: <>ProfilePage</> },
  { path: '/*', element: <NotFoundErrorPage /> },
  { path: '/error', element: <ServerErrorPage /> },
]

export default arrayRoutes
