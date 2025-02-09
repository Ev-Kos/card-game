import React, { FC } from 'react'

import { Input } from '../../../shared/input'

import styles from './styles.module.css'

type TProfileFieldProps = {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileField = ({
  label,
  name,
  type,
  value,
  onChange,
}: TProfileFieldProps) => {
  return (
    <div className={styles.profileField}>
      <div className={styles.profileFieldLeft}>{label}</div>
      <div className={styles.profileFieldRight}>
        <Input
          className={styles.profileInput}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={name}
        />
      </div>
    </div>
  )
}
