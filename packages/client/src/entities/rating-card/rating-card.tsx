import { Avatar } from '../../shared/avatar'
import styles from './styles.module.css'

export type TRateCardProps = {
  cardId?: string
  cardIdx: number
  userName: string
  score: number
  avatarUrl?: string
}

export const RatingCard = ({
  cardId,
  cardIdx,
  userName,
  score,
  avatarUrl,
}: TRateCardProps) => {
  return (
    <div id={cardId} className={styles.ratingItemContainer}>
      <h2 className={styles.ratingNumber}>{cardIdx + 1}</h2>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.score}>{score}</p>
      <Avatar url={avatarUrl} size="m" />
    </div>
  )
}
