import { RouterProvider } from 'react-router-dom'
import { router } from './shared/routes/routes'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const serverUrl = __SERVER_URL__ || 'http://localhost:'
        const url = `${serverUrl}${__SERVER_PORT__}`
        const response = await fetch(url)
        const data = await response.json()
        console.info(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchServerData()
  }, [])

  return <RouterProvider router={router} />
}

export default App
