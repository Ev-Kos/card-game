import { signUpFormData } from './assets'
import { Link } from '../../shared/link/link'
import { Form } from '../../entities/form'

import styles from './styles.module.css'

export const SignUpPage = () => {
  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Регистрация</h1>

      <div className={styles.formScrollWrapper}>
        <div>
          <Form {...signUpFormData} />
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
