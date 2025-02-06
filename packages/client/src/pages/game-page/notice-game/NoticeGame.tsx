import styles from './NoticeGame.module.css'
import cn from 'classnames'

type TProps = {
  text: string
  className?: string
}

export const NoticeGame = ({ text, className }: TProps) => {
  return <p className={cn(styles.noticeGame, className)}>{text}</p>
}
