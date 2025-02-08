import React from 'react'

import { Input } from '../../../shared/input'

import styles from './styles.module.css'

interface ProfileFieldProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
}) => {
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
