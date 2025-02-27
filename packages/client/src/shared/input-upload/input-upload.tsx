import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './styles.module.css'

type TInputUploadProps = {
  setFile: Dispatch<SetStateAction<File | null>>
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputUpload = ({ setFile }: TInputUploadProps) => {
  const [filePreview, setFilePreview] = useState({ src: '', alt: '' })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      setFile(files[0])
      setFilePreview({ src: URL.createObjectURL(files[0]), alt: files[0].name })
    }
  }

  return (
    <label className={styles.inputLabel}>
      <input
        className={styles.input}
        type="file"
        name="input-file"
        onChange={onChange}
      />
      <p
        className={
          filePreview.src.length !== 0
            ? styles.inputTextHidden
            : styles.inputText
        }>
        Выберите файл
      </p>
      {filePreview.src.length !== 0 && (
        <img
          className={styles.imagePreview}
          src={filePreview.src}
          alt={filePreview.alt}
        />
      )}
    </label>
  )
}
