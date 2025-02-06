import styles from './GamePage.module.css'
import Logo from '../../assets/Logo.svg'
import ButtonGoBack from '../../assets/ButtonGoBack.svg'
import { Game } from './game/Game'

export const GamePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrap}>
        <img src={ButtonGoBack} alt="Button go back" />
        <img src={Logo} alt="Desc Masters" />
      </div>
      <Game />
    </div>
  )
}
