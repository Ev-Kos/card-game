import classNames from 'classnames'

import type React from 'react'

import styles from './styles.module.css'

export type TInputProps = {
  isError?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ title, isError, ...props }: TInputProps) => {
  const className = classNames(styles.input, {
    [styles.inputError]: isError,
  })

  return (
    <div className={styles.inputContainer}>
      {title && <p className={styles.inputLabel}>{title}</p>}
      <input type="text" className={className} {...props} />
    </div>
  )
}
