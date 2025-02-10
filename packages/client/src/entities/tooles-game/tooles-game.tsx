import { ChangeEvent, useState } from 'react'
import { InputRange } from '../../shared/input-range/input-range'
import styles from './styles.module.css'

type TToolesGame = {
  onChangeMusic: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeEffects: (e: ChangeEvent<HTMLInputElement>) => void
  valueSoundMusic: number
  valueSoundEffects: number
}

export const ToolesGame = ({
  onChangeMusic,
  valueSoundMusic,
  onChangeEffects,
  valueSoundEffects,
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
    </div>
  )
}
