import { signInFormData } from './assets'
import { authorize } from '../../shared/hooks/api/authorize'
import { Link } from '../../shared/link/link'
import { Form } from '../../features/form'

import styles from './styles.module.css'

export const SignInPage = () => {
  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Вход</h1>
      <Form {...signInFormData} onSubmit={authorize} />

      <div className={styles.linksContainer}>
        <Link to="/registration" label="Нет аккаунта?">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  )
}
