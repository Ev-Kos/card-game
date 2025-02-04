import styles from './GamePage.module.css'
import Logo from '../../assets/Logo.svg'
import { Game } from './game/Game'

export const GamePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrap}>
        <div>buttonback</div>
        <img src={Logo} className={styles.logo} alt="Desc Masters" />
      </div>
      <Game />
    </div>
  )
}
