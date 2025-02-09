import { ButtonClose } from '../button-close/button-close'
import { rules } from './assets'
import styles from './styles.module.css'

export const RulesOfGame = () => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>Правила</p>
      <div className={styles.rulesContainer}>
        <ul className={styles.rules}>
          {rules.map((item, index) => (
            <li className={styles.rule} key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ButtonClose positionTop="-30px" positionRight="-40px" />
      </div>
    </div>
  )
}
