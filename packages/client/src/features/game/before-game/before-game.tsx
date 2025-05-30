import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'
import { RulesOfGame } from '../../../entities/rules-game/rules-game'
import { ToolesGame } from '../../../entities/tooles-game/tooles-game'
import { cards, colors } from '../assets'

type TProps = {
  onClickStart: VoidFunction
  setBackgroudBoard: Dispatch<SetStateAction<string>>
  setShirtCard: Dispatch<SetStateAction<string>>
  setValueSoundMusic: Dispatch<SetStateAction<number>>
  setValueSoundEffects: Dispatch<SetStateAction<number>>
  valueSoundMusic: number
  valueSoundEffects: number
}

export const BeforeGame = ({
  onClickStart,
  setBackgroudBoard,
  setShirtCard,
  setValueSoundMusic,
  setValueSoundEffects,
  valueSoundMusic,
  valueSoundEffects,
}: TProps) => {
  const [isShowRules, setShowRules] = useState(false)
  const [isShowTools, setShowTools] = useState(false)

  const [inputColors, setInputColors] = useState(
    colors.map((item, index) =>
      index === 0
        ? { color: item.color, isCheck: true }
        : { color: item.color, isCheck: false },
    ),
  )

  const [inputShirtCards, setShirtCards] = useState(
    cards.map((item, index) =>
      index === 0
        ? { image: item.image, isCheck: true }
        : { image: item.image, isCheck: false },
    ),
  )

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

  const onClickSaveButton = () => {
    setShowTools(false)
    const selectedColor = inputColors.find(item => item.isCheck === true)
    const selectedShirt = inputShirtCards.find(item => item.isCheck === true)
    if (selectedColor) {
      setBackgroudBoard(selectedColor.color)
    }
    if (selectedShirt) {
      setShirtCard(selectedShirt.image)
    }
  }

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

  const onChangeShirtCard = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setShirtCards([
      ...inputShirtCards.map((item, ind) =>
        ind === index
          ? { ...item, isCheck: true }
          : { ...item, isCheck: false },
      ),
    ])
  }

  return (
    <div className={styles.container} data-testid="before-game">
      {!isShowRules && !isShowTools && (
        <div className={styles.list}>
          <Button
            size="xl"
            color="contrast"
            onClick={onClickStart}
            data-testid="button-start-game">
            <p className={styles.buttonText}>Начать игру</p>
          </Button>
          <Button
            size="xl"
            color="contrast"
            onClick={showRules}
            data-testid="button-rules">
            <p className={styles.buttonText}>Правила</p>
          </Button>
          <Button size="xl" color="contrast" data-testid="button-tools">
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
          onClickSaveButton={onClickSaveButton}
          onChangeShirtCard={onChangeShirtCard}
          shirtCardArray={inputShirtCards}
        />
      )}
    </div>
  )
}
