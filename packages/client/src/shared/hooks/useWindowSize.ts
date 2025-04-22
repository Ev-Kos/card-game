import { useState, useEffect } from 'react'
import { debounce } from '../../features/game/helpers'

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    updateSize()

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
