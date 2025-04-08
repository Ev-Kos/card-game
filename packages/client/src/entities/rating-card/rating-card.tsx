import { Avatar } from '../../shared/avatar'
import { getImage } from '../../shared/utils/getImage'
import styles from './styles.module.css'

export type TRateCardProps = {
  cardIdx: number
  userName: string
  score: number
  avatarUrl: string | null
}

export const RatingCard = ({
  cardIdx,
  userName,
  score,
  avatarUrl,
}: TRateCardProps) => {
  return (
    <li className={styles.ratingItemContainer}>
      <h2 className={styles.ratingNumber}>{cardIdx + 1}</h2>
      <p className={styles.userName}>{userName}</p>
      <p className={styles.score}>{score}</p>
      <Avatar
        url={avatarUrl ? getImage(avatarUrl) : undefined}
        size="m"
        isProfile={false}
      />
    </li>
  )
}
