import styles from './styles.module.css'

type TProfileFieldProps = {
  label: string
  value?: string
}

export const ProfileInfoItem = ({ label, value }: TProfileFieldProps) => {
  return (
    <div className={styles.profileFieldBorder}>
      <p className={styles.fieldName}>{label}</p>
      <div className={styles.inputWrap}>
        <p className={value ? styles.fieldValue : styles.fieldValueEmpty}>
          {value}
        </p>
      </div>
    </div>
  )
}
