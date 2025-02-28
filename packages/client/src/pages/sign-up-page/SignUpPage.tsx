import { useForm } from 'react-hook-form'

import { signUpFormData } from './assets'
import { Link } from '../../shared/link/link'
import { Button } from '../../shared/button'
import { Form } from '../../features/form'

import type { TFormData } from '../../features/form/form'

import styles from './styles.module.css'

export const SignUpPage = () => {
  const methods = useForm<TFormData>({ mode: 'all' })

  const getSubmitButton = (onSubmit: () => Promise<void>) => (
    <Button size="s" color="primary" onClick={onSubmit}>
      Зарегистрироваться
    </Button>
  )

  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Регистрация</h1>

      <div className={styles.formScrollWrapper}>
        <div className={styles.formContainer}>
          <Form
            methods={methods}
            getSubmitButton={getSubmitButton}
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
