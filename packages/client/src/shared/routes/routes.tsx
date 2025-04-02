import {
  createBrowserRouter,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom'
import { routes } from '../../assets/assets'
import { initPages, Root } from '../../pages/root/root'
import SignInPage from '../../pages/sign-in-page'
import SignUpPage from '../../pages/sign-up-page'
import MainMenuPage from '../../pages/main-menu-page'
import ForumPage from '../../pages/forum-page'
import ForumTopicPage from '../../pages/forum-topic-page'
import GamePage from '../../pages/game-page'
import RatingPage from '../../pages/rating-page'
import ProfilePage from '../../pages/profile-page'
import NotFoundErrorPage from '../../pages/not-found-error-page'
import ServerErrorPage from '../../pages/server-error-page'
import { AppDispatch, RootState } from '../store/store'

export type PageInitContext = {
  uuid?: string | undefined
  authCookie?: string | undefined
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

const createRouter = (arr: RouteObject[]) => {
  if (typeof window === 'undefined') {
    return createMemoryRouter(arr)
  }
  return createBrowserRouter(arr)
}

export const routesArr = [
  {
    path: routes.login,
    element: <Root />,
    fetchData: initPages,
    children: [
      { index: true, element: <SignInPage /> },
      { path: routes.registration, element: <SignUpPage /> },
      { path: routes.main, element: <MainMenuPage /> },
      { path: routes.forum, element: <ForumPage /> },
      { path: routes.topicId, element: <ForumTopicPage /> },
      { path: routes.game, element: <GamePage /> },
      { path: routes.leaderboard, element: <RatingPage /> },
      { path: routes.profile, element: <ProfilePage /> },
      { path: '/*', element: <NotFoundErrorPage /> },
      { path: routes.error, element: <ServerErrorPage /> },
    ],
  },
]

export const router = createRouter(routesArr)
