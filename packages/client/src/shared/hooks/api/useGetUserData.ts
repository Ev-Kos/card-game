import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserData } from './getUserData'

export const useGetUserData = () => {
  const navigate = useNavigate()

  const handleUserDataResponse = async () => {
    const result = await getUserData()

    if (!result.status) {
      return
    }
    if (result.status === 200) {
      return
    }
    if (result.status === 401) {
      navigate('/')
    }
    if (result.status >= 500) {
      navigate('error')
    }
  }

  useEffect(() => {
    handleUserDataResponse()
  }, [])
}
