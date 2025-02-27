import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from './getUserData'

import { getProperty } from '../../utils/getProperty'
import { useAppDispatch } from '../../store/store'
import { getUser } from '../../store/slices/userSlice'

export const useGetUserData = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleUserDataResponse = async () => {
    const result = await getUserData()

    if (!result.status) {
      return
    }
    if (result.status === 200) {
      dispatch(getUser(getProperty(result, 'data')))
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
