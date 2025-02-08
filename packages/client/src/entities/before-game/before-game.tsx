import { useState } from 'react'
import { Button } from '../../shared/button'
import styles from './styles.module.css'
import { RulesOfGame } from '../../shared/rules-game/rules-game'

type TProps = {
  onClickStart?: () => VoidFunction
}

export const BeforeGame = ({ onClickStart }: TProps) => {
  const [isShowRules, setShowRules] = useState(false)
  const [isShowTools, setShowTulse] = useState(false)

  const showRules = () => {
    setShowRules(true)
  }

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ height: '95px' }}></div>
      <div className={styles.container}>
        {!isShowRules && !isShowTools && (
          <div className={styles.list}>
            <Button size="xl" color="contrast" onClick={onClickStart}>
              <p className={styles.buttonText}>Начать игру</p>
            </Button>
            <Button size="xl" color="contrast" onClick={showRules}>
              <p className={styles.buttonText}>Правила</p>
            </Button>
            <Button size="xl" color="contrast">
              <p className={styles.buttonText}>Настройки</p>
            </Button>
          </div>
        )}
        {isShowRules && <RulesOfGame />}
      </div>
    </div>
  )
}
