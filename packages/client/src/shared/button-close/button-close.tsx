import { CrossIcon } from '../../assets/CrossIcon'
import styles from './styles.module.css'
import classNames from 'classnames'

type TButtonCloseProps = {
  color?: 'secondary' | 'contrast'
} & React.HTMLAttributes<HTMLButtonElement>

export const ButtonClose = ({
  color = 'secondary',
  ...props
}: TButtonCloseProps) => {
  const className = classNames(styles.button, styles[`button-${color}`])

  return (
    <button className={className} {...props}>
      <CrossIcon />
    </button>
  )
}
