import { CheckIcon } from '../../assets/CheckIcon'
import styles from './styles.module.css'

type TInputCheckProps = {
  color?: string
  image?: string
  isCheck: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputCheck = ({
  color,
  isCheck,
  image,
  ...props
}: TInputCheckProps) => {
  return (
    <label
      className={styles.inputLabel}
      style={
        color
          ? { backgroundColor: color }
          : { backgroundImage: `url(${image})`, backgroundPosition: '50%' }
      }>
      {isCheck && <CheckIcon />}
      {image && <img className={styles.image} src={image}></img>}
      <input type="checkbox" className={styles.input} {...props} />
    </label>
  )
}
