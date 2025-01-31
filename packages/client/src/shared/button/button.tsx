import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

type TButtonProps = {
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
  /**
   * Текст кнопки
   * @default 'label'
   */
  label?: string
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({
  size = 's',
  color = 'primary',
  label = 'label',
  onClick,
}: TButtonProps) => {
  const className = classNames(styles.buttonContainer, {
    [styles.buttonS]: size === 's',
    [styles.buttonM]: size === 'm',
    [styles.buttonL]: size === 'l',
    [styles.buttonXL]: size === 'xl',
    [styles.buttonPrimary]: color === 'primary',
    [styles.buttonSecondary]: color === 'secondary',
    [styles.buttonContrast]: color === 'contrast',
  })

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  )
}
