import { routes } from '../../assets/assets'
import { ButtonLink } from '../../shared/button'
import styles from './style.module.css'

type TEndGameProps = {
  isPlayerWin: boolean
}

export const EndGame = ({ isPlayerWin }: TEndGameProps) => {
  return (
    <div className={styles.endGame}>
      <p className={styles.endGameText}>
        {isPlayerWin ? 'Победа!' : 'Вы проиграли'}
      </p>
      <div className={styles.endGameButtons}>
        <ButtonLink size="xl" color="contrast" to={routes.game}>
          Новая игра
        </ButtonLink>
        <ButtonLink size="xl" color="contrast" to={routes.main}>
          Главное меню
        </ButtonLink>
      </div>
    </div>
  )
}
