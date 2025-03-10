import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { signInFormData } from './assets'
import { routes } from '../../assets/assets'
import { authorize } from '../../shared/hooks/api/authorize'
import { Link } from '../../shared/link/link'
import { Button } from '../../shared/button'
import { Form } from '../../features/form'

import type { TFormData } from '../../features/form/form'

import styles from './styles.module.css'
import { YandexIcon } from '../../assets/yandexIcon'

export const SignInPage = () => {
  const navigate = useNavigate()
  const methods = useForm<TFormData>({ mode: 'all' })
  const { setError } = methods

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
      <Button color="black">
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
