import { ChangeEvent, useState } from 'react'
import { Button } from '../../shared/button'
import styles from './styles.module.css'
import { RulesOfGame } from '../rules-game/rules-game'
import { ToolesGame } from '../tooles-game/tooles-game'
import { colors } from './assets'

type TProps = {
  onClickStart?: VoidFunction
}

export const BeforeGame = ({ onClickStart }: TProps) => {
  const [isShowRules, setShowRules] = useState(false)
  const [isShowTools, setShowTools] = useState(false)

  const [valueSoundMusic, setValueSoundMusic] = useState(100)
  const [valueSoundEffects, setValueSoundEffects] = useState(100)

  const onChangeMusic = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSoundMusic(Number(e.target.value))
  }

  const onChangeEffects = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSoundEffects(Number(e.target.value))
  }

  const showRules = () => {
    setShowRules(!isShowRules)
  }

  const showTools = () => {
    setShowTools(!isShowTools)
  }

  const arr = colors.map((item, index) =>
    index === 0
      ? { color: item.color, isCheck: true }
      : { color: item.color, isCheck: false },
  )

  const [inputColors, setInputColors] = useState(
    colors.map((item, index) =>
      index === 0
        ? { color: item.color, isCheck: true }
        : { color: item.color, isCheck: false },
    ),
  )

  const onChangeTableColor = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setInputColors([
      ...inputColors.map((item, ind) =>
        ind === index
          ? { ...item, isCheck: true }
          : { ...item, isCheck: false },
      ),
    ])
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
              <p className={styles.buttonText} onClick={showTools}>
                Настройки
              </p>
            </Button>
          </div>
        )}
        {isShowRules && <RulesOfGame onClick={showRules} />}
        {isShowTools && (
          <ToolesGame
            onChangeMusic={onChangeMusic}
            valueSoundMusic={valueSoundMusic}
            onChangeEffects={onChangeEffects}
            valueSoundEffects={valueSoundEffects}
            onChangeTableColor={onChangeTableColor}
            colorsArray={inputColors}
          />
        )}
      </div>
    </div>
  )
}
