import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signInFormData } from './assets'
import { redirect_uri, routes } from '../../assets/assets'
import { authorize } from '../../shared/hooks/api/authorize'
import { Link } from '../../shared/link/link'
import { Button } from '../../shared/button'
import { Form } from '../../features/form'

import type { TFormData } from '../../features/form/form'

import styles from './styles.module.css'
import { YandexIcon } from '../../assets/yandexIcon'
import { getServiceId, yandexSingIn } from '../../shared/hooks/api/yandexAuth'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { sliceString } from '../../shared/utils/sliceString'
import { useSelector } from 'react-redux'
import { getUser } from '../../shared/store/selectors/userSelector'
import { router } from '../../shared/routes/routes'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const methods = useForm<TFormData>({ mode: 'all' })
  const { setError } = methods
  const userData = useSelector(getUser)
  const [yandexError, setYandexError] = useState('')

  const getSubmitButton = (onSubmit: () => Promise<void>) => (
    <Button size="s" color="primary" onClick={onSubmit}>
      Войти
    </Button>
  )

  const handleSubmit = async (formData: TFormData) => {
    const result = await authorize(formData)

    if (!result) {
      return
    }
    if (result === 200 || result === 400) {
      navigate(routes.main)
    }
    if (result === 401) {
      setError('login', {
        message: 'пользователя с таким логином не существует',
        type: 'custom',
      })
    }
    if (result >= 500) {
      navigate(routes.error)
    }
  }

  function isAxiosSuccessResponse<T extends object>(
    data: T | AxiosError,
    successKey: keyof T,
  ): data is T {
    return !(data instanceof AxiosError) && successKey in data
  }

  const handleYandexAuth = async () => {
    try {
      const serviceId = await getServiceId()
      if (isAxiosSuccessResponse(serviceId, 'service_id')) {
        window.location.replace(
          `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId.service_id}&redirect_uri=${redirect_uri}`,
        )
      }
    } catch (error) {
      console.error('Ошибка обновления аватара:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (location.search.includes('code')) {
        try {
          const result = await yandexSingIn({
            code: sliceString('=', '&', location.search),
            redirect_uri: redirect_uri,
          })
          if (result.status === 400 || result.status === 200) {
            navigate(routes.main)
          }

          if (result.status && result.status >= 500) {
            setYandexError(
              'Ошибка авторизации через Яндекс, попробуйте войти используя логин и пароль',
            )
          }
        } catch (error) {
          console.error('Ошибка авторизации через Яндекс', error)
        }
      } else {
        if (userData) {
          const { from } = location.state || { from: { pathname: routes.main } }
          navigate(from)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.formContainer}>
        <Form
          methods={methods}
          getSubmitButton={getSubmitButton}
          onSubmit={handleSubmit}
          {...signInFormData}
        />
      </div>
      {yandexError.length && <p>{yandexError}</p>}
      <Button color="black" onClick={handleYandexAuth}>
        <div className={styles.yandexButton}>
          <YandexIcon />
          <span className={styles.yandexButtonText}>Яндекс ID</span>
        </div>
      </Button>
      <div className={styles.linksContainer}>
        <Link to="/registration" label="Нет аккаунта?">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  )
}
