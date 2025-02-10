import { CheckIcon } from './CheckIcon'
import styles from './styles.module.css'

type TInputCheckProps = {
  color: string
  isCheck: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputCheck = ({ color, isCheck, ...props }: TInputCheckProps) => {
  return (
    <label className={styles.inputLabel} style={{ background: color }}>
      {isCheck && <CheckIcon />}
      <input type="checkbox" className={styles.input} {...props} />
    </label>
  )
}
