import { signInFormData } from './assets'
import { Link } from '../../shared/link/link'
import { Form } from '../../entities/form'

import styles from './styles.module.css'

export const SignInPage = () => {
  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Вход</h1>
      <Form {...signInFormData} />

      <div className={styles.linksContainer}>
        <Link href="/registration" label="Нет аккаунта?">
          Зарегистрироваться
        </Link>
        <Link href="/" label="Забыли пароль?">
          Восстановить пароль
        </Link>
      </div>
    </div>
  )
}
