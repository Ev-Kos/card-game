import { Game } from '../../features/game/Game'
import { ButtonGoBack } from '../../shared/button-go-back'
import styles from './styles.module.css'

export const GamePage = () => {
  return (
    <div className={styles.gamePage}>
      <ButtonGoBack />
      <Game />
    </div>
  )
}
