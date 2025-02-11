import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import ServerErrorPage from './pages/server-error-page'
import NotFoundErrorPage from './pages/not-found-error-page'
import MainMenuPage from './pages/main-menu-page'
import RatingPage from './pages/rating-page'
import SignInPage from './pages/sign-in-page'
import SignUpPage from './pages/sign-up-page'
import BackgroundImage from './assets/BackgroundImage.svg'
import Logo from './assets/Logo.svg'

import styles from './styles.module.css'
import GamePage from './pages/game-page'
import { routes } from './assets/assets'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <>
      <Routes>
        <Route path={routes.login} element={<SignInPage />} />
        <Route path={routes.main} element={<MainMenuPage />} />
        <Route path={routes.registration} element={<SignUpPage />} />
        <Route path={routes.forum} element={<>ForumPage</>} />
        <Route path={routes.forumId} element={<>ForumTopicPage</>} />
        <Route path={routes.game} element={<GamePage />} />
        <Route path={routes.leaderboard} element={<RatingPage />} />
        <Route path={routes.profile} element={<>ProfilePage</>} />
        <Route path="/*" element={<NotFoundErrorPage />} />
        <Route path={routes.error} element={<ServerErrorPage />} />
      </Routes>

      <img src={Logo} className={styles.logo} alt="Desc Masters" />
      <img src={BackgroundImage} className={styles.backgroundImage} />
    </>
  )
}

export default App
