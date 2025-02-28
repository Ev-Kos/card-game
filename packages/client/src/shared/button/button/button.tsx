import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

export type TButtonProps = {
  /**
   * Размер кнопки
   * @default 's'
   */
  size?: 's' | 'm' | 'l' | 'xl'
  /**
   * Цвет кнопки
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'contrast'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  size = 's',
  color = 'primary',
  children,
  ...props
}: TButtonProps) => {
  const className = classNames(
    props?.className,
    styles.buttonContainer,
    styles[`button-${size}`],
    styles[`button-${color}`],
  )

  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}
