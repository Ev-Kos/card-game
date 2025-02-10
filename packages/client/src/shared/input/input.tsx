import type React from 'react'

import styles from './styles.module.css'

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ title, ...props }: TInputProps) => {
  return (
    <div className={styles.inputContainer}>
      {title && <p className={styles.inputLabel}>{title}</p>}
      <input type="text" className={styles.input} {...props} />
    </div>
  )
}
