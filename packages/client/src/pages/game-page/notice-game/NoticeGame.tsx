import styles from './NoticeGame.module.css'

type TProps = {
  text: string
}

export const NoticeGame = ({ text }: TProps) => {
  return <p className={styles.noticeGame}>{text}</p>
}
