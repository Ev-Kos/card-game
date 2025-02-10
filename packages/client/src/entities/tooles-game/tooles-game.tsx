import { ChangeEvent, useState } from 'react'
import { InputRange } from '../../shared/input-range/input-range'
import styles from './styles.module.css'
import { InputCheck } from '../../shared/input-check/input-check'
import { Button } from '../../shared/button'

type TColors = {
  color: string
  isCheck: boolean
}

type TToolesGame = {
  onChangeMusic: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeEffects: (e: ChangeEvent<HTMLInputElement>) => void
  valueSoundMusic: number
  valueSoundEffects: number
  onChangeTableColor: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  colorsArray: TColors[]
  onClickSaveButton: VoidFunction
}

export const ToolesGame = ({
  onChangeMusic,
  valueSoundMusic,
  onChangeEffects,
  valueSoundEffects,
  onChangeTableColor,
  colorsArray,
  onClickSaveButton,
}: TToolesGame) => {
  return (
    <div className={styles.container}>
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
              />
            ))}
          </div>
        </div>
        <div className={styles.tool}>
          <p className={styles.toolName}>Рубашка</p>
        </div>
      </div>
      <Button size="s" onClick={onClickSaveButton}>
        Ок
      </Button>
    </div>
  )
}
