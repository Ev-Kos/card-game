import classNames from 'classnames'

import type React from 'react'

import styles from './styles.module.css'

export type TInputProps = {
  isError?: boolean
  titlePosition?: 'internal' | 'external'
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  title,
  isError,
  titlePosition = 'external',
  ...props
}: TInputProps) => {
  const inputClassName = classNames(styles.input, {
    [styles.inputInternalLabel]: titlePosition === 'internal',
    [styles.inputError]: isError,
  })

  const labelClassName = classNames(styles.inputLabel, {
    [styles.inputLabelExternal]: titlePosition === 'external',
    [styles.inputLabelInternal]: titlePosition === 'internal',
  })

  return (
    <div className={styles.inputContainer}>
      {title && <p className={labelClassName}>{title}</p>}
      <input type="text" className={inputClassName} {...props} />
    </div>
  )
}
