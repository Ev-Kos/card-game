import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProperty } from '../../utils/getProperty'
import { useAppDispatch } from '../../store/store'
import { getUserAction } from '../../store/slices/userSlice'
import { routes } from '../../../assets/assets'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/selectors/userSelector'
import { getUserData } from './getUserData'

export const useGetUserData = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userData = useSelector(getUser)

  const handleUserDataResponse = async () => {
    if (!userData) {
      const result = await getUserData()

      if (!result.status) {
        return
      }
      if (result.status === 200) {
        dispatch(getUserAction(getProperty(result, 'data')))
        return
      }
      if (result.status === 401) {
        navigate('/')
      }
      if (result.status >= 500) {
        navigate(routes.error)
      }
    }
  }

  useEffect(() => {
    handleUserDataResponse()
  }, [])
}
