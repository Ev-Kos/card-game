import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'

import AppRouter from './router/AppRouter'

import BackgroundImage from './assets/BackgroundImage.svg'
import Logo from './assets/Logo.svg'

import styles from './styles.module.css'
import { BeforeGame } from './entities/before-game/before-game'

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
      {/* <Router>
        <AppRouter />
      </Router> */}
      <img src={Logo} className={styles.logo} alt="Desc Masters" />
      <img src={BackgroundImage} className={styles.backgrounImage} />
      <BeforeGame />
    </>
  )
}

export default App
