import styles from './notice.module.css'

type TNoticeProps = {
  text: string
}

export const Notice = ({ text }: TNoticeProps) => {
  return <p className={styles.notice}>{text}</p>
}
