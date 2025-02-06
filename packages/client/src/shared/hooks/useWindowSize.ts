import { useState, useEffect } from 'react'
import { debounce } from '../../pages/game-page/utils/game-helpers'

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setSize([window.innerWidth, window.innerHeight])
    }, 200)

    window.addEventListener('resize', debouncedResizeHandler)
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  }, [])

  return size
}
