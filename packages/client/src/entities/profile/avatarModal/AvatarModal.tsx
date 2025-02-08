import { FC } from 'react'
import { Button } from '../../../shared/button'
import styles from './styles.module.css'

type TAvatarModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: VoidFunction
  fileName: string | null
  isUploaded: boolean
}

export const AvatarModal: FC<TAvatarModalProps> = ({
  isOpen,
  onClose,
  onImageChange,
  onUpload,
  fileName,
  isUploaded,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {!isUploaded && (
          <>
            <Button className={styles.closeButton} onClick={onClose}>
              ×
            </Button>
            {fileName ? <h1>Аватар выбран</h1> : <h2>Изменить аватар</h2>}
          </>
        )}
        <label className={styles.modalImgFile}>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className={styles.modalInputFile}
          />
          <span
            className={
              isUploaded ? styles.modalUploadedMessage : styles.modalSpan
            }>
            {fileName || 'Выбрать файл на компьютере'}
          </span>
        </label>
        {!isUploaded && (
          <>
            <Button color="secondary" size="m" onClick={onUpload}>
              Загрузить
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
