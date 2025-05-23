import { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { SoundIcon } from '../../assets/SoundIcon'
import { SoundOffIcon } from '../../assets/SoundOffIcon'

type TInputRangeProps = {
  valueSound?: number
  colorTrack?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputRange = ({
  valueSound,
  colorTrack = '#b38ff1',
  ...props
}: TInputRangeProps) => {
  const [background, setBackground] = useState('')

  useEffect(() => {
    setBackground(
      `linear-gradient(to right, #350f68 ${Number(valueSound) * 100}%,${colorTrack} ${Number(valueSound) * 100}% `,
    )
  }, [valueSound])

  return (
    <div className={styles.container}>
      {valueSound !== 0 ? <SoundIcon /> : <SoundOffIcon />}
      <input
        type="range"
        className={styles.input}
        {...props}
        min={0}
        max={1}
        step={0.1}
        value={valueSound}
        style={{ background: background }}
      />
      <p className={styles.valueSound}>{`${Number(valueSound) * 100}%`}</p>
    </div>
  )
}
