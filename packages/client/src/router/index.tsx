import { type RouteObject } from 'react-router-dom'

import {
  LoginPage,
  RegistrationPage,
  ForumPage,
  ForumTopicPage,
  ForumTopicPageId,
  GamePage,
  HomePage,
  LeaderboardPage,
  NotFoundPage,
  ProfilePage,
  ServerErrorPage,
} from '../pages'

const arrayRoutes: RouteObject[] = [
  { path: '/', element: <LoginPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/registration', element: <RegistrationPage /> },
  { path: '/forum', element: <ForumPage /> },
  { path: '/forum/topic', element: <ForumTopicPage /> },
  { path: '/game', element: <GamePage /> },
  { path: '/leaderboard', element: <LeaderboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/*', element: <NotFoundPage /> },
  { path: '/error', element: <ServerErrorPage /> },
  { path: '/forum/topic/:id', element: <ForumTopicPageId /> },
]

export default arrayRoutes
