import { Error } from '../../entities/error'
import Diamonds from '../../assets/Diamonds.svg'

import styles from './styles.module.css'

export const NotFoundErrorPage = () => {
  return (
    <Error
      description="Уже работаем над ошибкой..."
      text="а пока можно собраться с друзьями за игрой в оффлайне">
      <h1 className={styles.errorTitle}>4</h1>
      <img src={Diamonds} alt="0" />
      <h1 className={styles.errorTitle}>4</h1>
    </Error>
  )
}
