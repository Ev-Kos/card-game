import { Input } from '../../../shared/input/input'
import styles from './styles.module.css'

type TProfileFieldProps = {
  label: string
  name: string
  type: string
  value: string
  isChange: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileField = ({
  label,
  name,
  type,
  value,
  isChange,
  onChange,
}: TProfileFieldProps) => {
  return (
    <div className={styles.profileField}>
      <p className={styles.fieldName}>{label}</p>
      <div className={styles.inputWrap}>
        {isChange ? (
          <Input
            type={type}
            name={name}
            value={value}
            placeholder={name}
            isProfile={true}
            onChange={onChange}
          />
        ) : (
          <p className={styles.fieldValue}>{value}</p>
        )}
      </div>
    </div>
  )
}
