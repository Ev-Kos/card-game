import styles from './styles.module.css'
import cn from 'classnames'

type TProps = {
  text: string
  className?: string
  position?: number
}

export const NoticeGame = ({ text, className, position }: TProps) => {
  return (
    <p className={cn(styles.noticeGame, className)} style={{ left: position }}>
      {text}
    </p>
  )
}
