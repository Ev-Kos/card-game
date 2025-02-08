import { Avatar } from '../../shared/avatar'
import styles from './styles.module.css'

export type TRateCardProps = {
  cardId: number
  userName: string
  score: number
  avatarUrl?: string
}

export const RatingCard = ({
  cardId,
  userName,
  score,
  avatarUrl,
}: TRateCardProps) => {
  return (
    <div id={'rateItem'} className={styles.ratingItemContainer}>
      <h2 className={styles.ratingNumber}>{cardId + 1}</h2>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.score}>{score}</p>
      <Avatar url={avatarUrl} size="m" />
    </div>
  )
}
