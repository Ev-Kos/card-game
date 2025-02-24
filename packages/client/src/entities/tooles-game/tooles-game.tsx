import { ChangeEvent, useState } from 'react'
import { InputRange } from '../../shared/input-range/input-range'
import styles from './styles.module.css'
import { InputCheck } from '../../shared/input-check/input-check'
import { Button } from '../../shared/button'

type TColors = {
  color: string
  isCheck: boolean
}

type TShirtCard = {
  image: string
  isCheck: boolean
}

type TToolesGame = {
  onChangeMusic: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeEffects: (e: ChangeEvent<HTMLInputElement>) => void
  valueSoundMusic: number
  valueSoundEffects: number
  onChangeTableColor: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  onChangeShirtCard: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  colorsArray: TColors[]
  onClickSaveButton: VoidFunction
  shirtCardArray: TShirtCard[]
}

export const ToolesGame = ({
  onChangeMusic,
  valueSoundMusic,
  onChangeEffects,
  valueSoundEffects,
  onChangeTableColor,
  onChangeShirtCard,
  colorsArray,
  onClickSaveButton,
  shirtCardArray,
}: TToolesGame) => {
  return (
    <div className={styles.container} data-testid="tools">
      <p className={styles.name}>Настройки</p>
      <div className={styles.toolsWrap}>
        <p className={styles.toolsName}>Звук</p>
        <div className={styles.tool}>
          <p className={styles.toolName}>Музыка</p>
          <InputRange onChange={onChangeMusic} valueSound={valueSoundMusic} />
        </div>
        <div className={styles.tool}>
          <p className={styles.toolName}>Эффекты</p>
          <InputRange
            onChange={onChangeEffects}
            valueSound={valueSoundEffects}
          />
        </div>
      </div>
      <div className={styles.toolsWrap}>
        <p className={styles.toolsName}>Цвета</p>
        <div className={styles.tool}>
          <p className={styles.toolName}>Стол</p>
          <div className={styles.inputsCheck}>
            {colorsArray.map((item, index) => (
              <InputCheck
                color={item.color}
                isCheck={item.isCheck}
                checked={item.isCheck}
                onChange={e => onChangeTableColor(index, e)}
                key={index}
                name={`color-${index}`}
              />
            ))}
          </div>
        </div>
        <div className={styles.tool}>
          <p className={styles.toolName}>Рубашка</p>
          <div className={styles.inputsCheck}>
            {shirtCardArray.map((item, index) => (
              <InputCheck
                isCheck={item.isCheck}
                checked={item.isCheck}
                onChange={e => onChangeShirtCard(index, e)}
                key={index}
                image={item.image}
                name={`shirt-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        size="s"
        onClick={onClickSaveButton}
        data-testid="button-submit-tools">
        Ок
      </Button>
    </div>
  )
}
