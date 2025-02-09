import { InputRange } from '../../shared/input-range/input-range'
import styles from './styles.module.css'

export const ToolesGame = () => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>Настройки</p>
      <div className={styles.toolsWrap}>
        <p className={styles.toolsName}>Звук</p>
        <div className={styles.tool}>
          <p className={styles.toolName}>Музыка</p>
          <InputRange />
        </div>
        <div className={styles.tool}>
          <p>Эффекты</p>
        </div>
      </div>
    </div>
  )
}
