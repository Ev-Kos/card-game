import {
  createBrowserRouter,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom'
import { routes } from '../../assets/assets'
import { Root } from '../../pages/root/root'
import SignInPage from '../../pages/sign-in-page'

const createRouter = (arr: RouteObject[]) => {
  if (typeof window === 'undefined') {
    return createMemoryRouter(arr)
  }
  return createBrowserRouter(arr)
}

export const routesArr: RouteObject[] = [
  {
    path: routes.login,
    element: <Root />,
    children: [{ index: true, element: <SignInPage /> }],
  },
]

export const router = createRouter(routesArr)
