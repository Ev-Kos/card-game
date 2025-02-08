import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import ServerErrorPage from './pages/server-error-page'
import NotFoundErrorPage from './pages/not-found-error-page'
import MainMenuPage from './pages/main-menu-page'
import BackgroundImage from './assets/BackgroundImage.svg'
import Logo from './assets/Logo.svg'

import styles from './styles.module.css'

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
        <Route path="/" element={<>LoginPage</>} />
        <Route path="/main" element={<MainMenuPage />} />
        <Route path="/registration" element={<>RegistrationPage</>} />
        <Route path="/forum" element={<>ForumPage</>} />
        <Route path="/forum/:id" element={<>ForumTopicPage</>} />
        <Route path="/game" element={<>PageGame</>} />
        <Route path="/leaderboard" element={<>LeaderboardPage</>} />
        <Route path="/profile" element={<>ProfilePage</>} />
        <Route path="/*" element={<NotFoundErrorPage />} />
        <Route path="/error" element={<ServerErrorPage />} />
      </Routes>

      <img src={Logo} className={styles.logo} alt="Desc Masters" />
      <img src={BackgroundImage} className={styles.backgroundImage} />
    </>
  )
}

export default App
