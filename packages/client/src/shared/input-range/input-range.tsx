import { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { SoundIcon } from '../../assets/SoundIcon'
import { SoundOffIcon } from '../../assets/SoundOffIcon'

type TInputRangeProps = {
  valueSound?: number
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputRange = ({ valueSound, ...props }: TInputRangeProps) => {
  const [background, setBackground] = useState('')

  useEffect(() => {
    setBackground(
      `linear-gradient(to right, #350f68 ${valueSound}%,#b38ff1 ${valueSound}% `,
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
        max={100}
        value={valueSound}
        style={{ background: background }}
      />
      <p className={styles.valueSound}>{`${valueSound}%`}</p>
    </div>
  )
}
