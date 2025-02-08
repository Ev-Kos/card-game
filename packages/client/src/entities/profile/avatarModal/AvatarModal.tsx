import { FC } from 'react'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'

type TAvatarModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: VoidFunction
}

export const AvatarModal: FC<TAvatarModalProps> = ({
  isOpen,
  onClose,
  onImageChange,
  onUpload,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Button className={styles.closeButton} onClick={onClose}>
          ×
        </Button>
        <h2>Изменить аватар</h2>
        <label className={styles.modalImgFile}>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className={styles.modalInputFile}
          />
          <span>Выбрать файл на компьютере</span>
        </label>
        <Button color="secondary" size="m" onClick={onUpload}>
          Загрузить
        </Button>
      </div>
    </div>
  )
}
