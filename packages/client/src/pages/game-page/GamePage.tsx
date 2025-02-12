import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { ButtonGoBack } from '../../shared/button-go-back'
import { Game } from '../../features/game/Game'

import styles from './styles.module.css'

export const GamePage = () => {
  useGetUserData()

  return (
    <div className={styles.gamePage}>
      <ButtonGoBack />
      <Game />
    </div>
  )
}
