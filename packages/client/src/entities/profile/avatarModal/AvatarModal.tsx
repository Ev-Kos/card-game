import { Button } from '../../../shared/button'
import styles from './styles.module.css'

interface AvatarModalProps {
  isOpen: boolean
  onClose: () => void
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  onImageChange,
  onUpload,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Изменить аватар</h2>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className={styles.modalInput}
        />
        <Button
          label="Загрузить"
          color="secondary"
          size="m"
          onClick={onUpload}
        />
      </div>
    </div>
  )
}
