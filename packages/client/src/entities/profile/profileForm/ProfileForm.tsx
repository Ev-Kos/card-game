import React, { useState } from 'react'

import { ProfileField } from '../profileField'
import { Button } from '../../../shared/button'

import styles from './styles.module.css'

interface ProfileFormProps {
  formData: {
    name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleChange,
}) => {
  const fields = [
    { label: 'Имя', name: 'name', type: 'text' },
    { label: 'Фамилия', name: 'second_name', type: 'text' },
    { label: 'Никнейм', name: 'login', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Телефон', name: 'phone', type: 'tel' },
    { label: 'Пароль', name: 'password', type: 'password' },
  ] as const

  return (
    <form className={styles.profileUserData}>
      {fields.map((field, index) => (
        <ProfileField
          key={index}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}
      <div className={styles.profileButtonCenter}>
        <Button label="Редактировать" color="secondary" size="m" />
      </div>
    </form>
  )
}
