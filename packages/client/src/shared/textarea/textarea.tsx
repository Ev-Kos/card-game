import styles from './styles.module.css'

export const Textarea = () => {
  return (
    <label className={styles.textareaLabel}>
      <textarea className={styles.textarea} />
    </label>
  )
}
