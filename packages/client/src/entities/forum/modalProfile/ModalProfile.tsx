import React from 'react'
import styles from './ModalProfile.module.css'
import { Button } from '../../../shared/button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalProfile: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalProfileClose} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalProfileTitle}>Добавление темы</h2>
        <form className={styles.modalProfileForm}>
          <div className={styles.modalProfileFlex}>
            <label className={styles.modalProfileLabel}>Тема:</label>
            <input className={styles.modalProfileInput} type="text" />
          </div>
          <div className={styles.modalProfileFlex}>
            <label className={styles.modalProfileLabel}>Описание:</label>
            <textarea className={styles.modalProfileTextarea} />
          </div>

          <div className={styles.modalProfileButtonCenter}>
            <Button size="m">Добавить</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
