import { Error } from '../../entities/error'
import Hearts from '../../assets/Hearts.svg'

import styles from './styles.module.css'

export const ServerErrorPage = () => {
  return (
    <Error
      description="Уже работаем над ошибкой..."
      text="а пока можно собраться с друзьями за игрой в оффлайне">
      <h1 className={styles.errorTitle}>5</h1>
      <img src={Hearts} alt="0" />
      <h1 className={styles.errorTitle}>0</h1>
    </Error>
  )
}
