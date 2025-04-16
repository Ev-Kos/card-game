import { useForm } from 'react-hook-form'

import { signUpFormData } from './assets'
import { Link } from '../../shared/link/link'
import { Button } from '../../shared/button'
import { Form } from '../../features/form'

import type { TFormData } from '../../features/form/form'

import styles from './styles.module.css'
import { createUser } from '../../shared/hooks/api/createUser'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../assets/assets'
import { useEffect, useState } from 'react'

export const SignUpPage = () => {
  const methods = useForm<TFormData>({ mode: 'all' })
  const { formState } = methods
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)

  const getSubmitButton = (onSubmit: () => Promise<void>) => (
    <Button size="s" color="primary" onClick={onSubmit}>
      Зарегистрироваться
    </Button>
  )

  const handleSubmit = async (formData: TFormData) => {
    if (Object.keys(formState.errors).length === 0) {
      const result = await createUser(formData)

      if (!result) {
        return
      }

      if (result === 409) {
        setIsError(true)
      }

      if (result === 200) {
        navigate(routes.main)
        localStorage.setItem('isAuth', 'true')
      }

      if (result >= 500) {
        navigate(routes.error)
      }
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')

    if (isAuth) {
      navigate(routes.main)
    }
  }, [])

  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Регистрация</h1>
      {isError && (
        <p className={styles.errorText}>
          Пользователь с таким email, логином или телефоном уже существует
        </p>
      )}
      <div className={styles.formScrollWrapper}>
        <div className={styles.formContainer}>
          <Form
            methods={methods}
            getSubmitButton={getSubmitButton}
            onSubmit={handleSubmit}
            {...signUpFormData}
          />

          <div className={styles.linksContainer}>
            <Link to="/" label="Есть аккаунт?">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
