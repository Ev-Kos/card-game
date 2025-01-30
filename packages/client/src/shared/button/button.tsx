import React from 'react'
import classNames from 'classnames'

import styles from './styles.module.css'

type TButtonProps = {
  size?: 's' | 'm' | 'l' | 'xl'
  color: 'primary' | 'secondary' | 'contrast'
  label: string
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({ size = 's', color, label, onClick }: TButtonProps) => {
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
