import styles from './styles.module.css'

type TInputRangeProps = {
  valueSound?: number
} & React.InputHTMLAttributes<HTMLInputElement>

export const InputRange = ({ ...props }: TInputRangeProps) => {
  return (
    <div className={styles.container}>
      <input type="range" className={styles.input} {...props} />
    </div>
  )
}
