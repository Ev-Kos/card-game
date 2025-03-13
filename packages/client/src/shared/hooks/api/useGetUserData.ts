import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { getUserAction } from '../../store/slices/userSlice'
import { routes } from '../../../assets/assets'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/selectors/userSelector'
import { getUserData } from './getUserData'
import { isAxiosSuccessResponse } from '../../utils/isAxiosSuccessResponse'

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
      if (result.status === 200 && isAxiosSuccessResponse(result, 'data')) {
        dispatch(getUserAction(result.data))
        return
      }
      if (result.status === 401) {
        localStorage.removeItem('isAuth')
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
