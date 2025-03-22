import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signInFormData } from './assets'
import { redirect_uri, routes, yandexAuthUrl } from '../../assets/assets'
import { authorize } from '../../shared/hooks/api/authorize'
import { Link } from '../../shared/link/link'
import { Button } from '../../shared/button'
import { Form } from '../../features/form'
import type { TFormData } from '../../features/form/form'
import styles from './styles.module.css'
import { YandexIcon } from '../../assets/yandexIcon'
import { getServiceId, yandexSingIn } from '../../shared/hooks/api/yandexAuth'
import { useEffect, useState } from 'react'
import { sliceString } from '../../shared/utils/sliceString'
import { isAxiosSuccessResponse } from '../../shared/utils/isAxiosSuccessResponse'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const methods = useForm<TFormData>({ mode: 'all' })
  const { setError } = methods
  const [isYandexError, setYandexError] = useState(false)

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
      localStorage.setItem('isAuth', 'true')
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

  const handleYandexAuth = async () => {
    try {
      const serviceId = await getServiceId()
      if (isAxiosSuccessResponse(serviceId, 'service_id')) {
        window.location.replace(
          yandexAuthUrl(serviceId.service_id, redirect_uri),
        )
      } else {
        setYandexError(true)
      }
    } catch (error) {
      console.error('Ошибка получения service-id:', error)
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')

    const fetchData = async () => {
      if (location.search.includes('code')) {
        try {
          const result = await yandexSingIn({
            code: sliceString('=', '&', location.search),
            redirect_uri: redirect_uri,
          })
          if (result.status === 400 || result.status === 200) {
            navigate(routes.main)
            localStorage.setItem('isAuth', 'true')
          } else {
            setYandexError(true)
          }
        } catch (error) {
          console.error('Ошибка авторизации через Яндекс:', error)
        }
      } else {
        if (isAuth) {
          navigate(routes.main)
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
      {isYandexError && (
        <p className={styles.errorText}>
          Ошибка авторизации через Яндекс, попробуйте войти используя логин и
          пароль
        </p>
      )}
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
