import styles from './styles.module.css'

type TInputErrorProps = {
  error?: string
}

export const InputError = ({ error }: TInputErrorProps) => {
  if (!error) {
    return null
  }

  return <p className={styles.errorText}>{error}</p>
}
