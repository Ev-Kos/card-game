import { routes } from '../../assets/assets'
import { Button, ButtonLink } from '../../shared/button'
import styles from './style.module.css'

type TEndGameProps = {
  isPlayerWin: boolean
  isNobodyWin: boolean
  onClick: VoidFunction
}

export const EndGame = ({
  isPlayerWin,
  isNobodyWin,
  onClick,
}: TEndGameProps) => {
  return (
    <div className={styles.endGame}>
      <p className={styles.endGameText}>
        {isNobodyWin ? 'Ничья' : isPlayerWin ? 'Победа!' : 'Вы проиграли'}
      </p>
      <div className={styles.endGameButtons}>
        <Button
          size="xl"
          color="contrast"
          onClick={onClick}
          data-testid="button-new-game">
          Новая игра
        </Button>
        <ButtonLink
          size="xl"
          color="contrast"
          to={routes.main}
          data-testid="button-menu">
          Главное меню
        </ButtonLink>
      </div>
    </div>
  )
}
