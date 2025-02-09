import { ButtonClose } from '../../shared/button-close/button-close'
import { rules } from './assets'
import styles from './styles.module.css'

type TRulesOfGameProps = {
  onClick: VoidFunction
}

export const RulesOfGame = ({ onClick }: TRulesOfGameProps) => {
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
        <ButtonClose onClick={onClick} />
      </div>
    </div>
  )
}
