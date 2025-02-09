import styles from './GamePage.module.css'
import ButtonGoBack from '../../assets/ButtonGoBack.svg'
import { Game } from '../../features/game/Game'

export const GamePage = () => {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  )
}
