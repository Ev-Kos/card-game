import LoginPage from '../pages/login/LoginPage'
import RegistrationPage from '../pages/registration/RegistrationPage'
import ForumPage from '../pages/forum/ForumPage'
import ForumTopicPage from '../pages/forum/ForumTopicPage'
import GamePage from '../pages/game/GamePage'
import HomePage from '../pages/home/HomePage'
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import ProfilePage from '../pages/profile/ProfilePage'

interface ArrayRoutesInterface {
  path: string
  component: React.ComponentType
}

const arrayRoutes: ArrayRoutesInterface[] = [
  { path: '/', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/registration', component: RegistrationPage },
  { path: '/forum', component: ForumPage },
  { path: '/forum/topic', component: ForumTopicPage },
  { path: '/game', component: GamePage },
  { path: '/leaderboard', component: LeaderboardPage },
  { path: '/profile', component: ProfilePage },
  { path: '/*', component: NotFoundPage },
]

export default arrayRoutes
