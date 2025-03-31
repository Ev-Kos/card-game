import styles from './styles.module.css'

export const Textarea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <label className={styles.textareaLabel}>
      <textarea className={styles.textarea} {...props} />
    </label>
  )
}
