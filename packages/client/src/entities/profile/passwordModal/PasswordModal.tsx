import React, { FC, useState } from 'react'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'

type TPasswordModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  onSave: (oldPassword: string, newPassword: string) => void
}

export const PasswordModal: FC<TPasswordModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      onSave(oldPassword, newPassword)
      onClose()
    } else {
      alert('Новый пароль и подтверждение не совпадают')
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Button className={styles.closeButton} onClick={onClose}>
          ×
        </Button>
        <div className={styles.profilePassword}>
          <label>Старый пароль</label>
          <input
            className={styles.profilePasswordInput}
            type="password"
            name="OldPassword"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Введите старый пароль"
          />
        </div>
        <div className={styles.profilePassword}>
          <label>Новый пароль</label>
          <input
            className={styles.profilePasswordInput}
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Введите новый пароль"
          />
        </div>
        <div className={styles.profilePassword}>
          <label>Повторите новый пароль</label>
          <input
            className={styles.profilePasswordInput}
            type="password"
            name="newPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Введите новый пароль"
          />
        </div>
        <Button color="primary" size="m" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
