import { useEffect } from 'react'

import BackgroundImage from './assets/BackgroundImage.svg'
import Logo from './assets/Logo.svg'

import styles from './styles.module.css'
import ProfilePage from './pages/profile'

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
      <ProfilePage />
      <img src={Logo} className={styles.logo} alt="Desc Masters" />
      <img src={BackgroundImage} className={styles.backgrounImage} />
    </>
  )
}

export default App
