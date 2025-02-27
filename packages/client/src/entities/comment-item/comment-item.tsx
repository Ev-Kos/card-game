import { TComment } from '../../pages/forum-topic-page/ForumTopicPage'
import { Avatar } from '../../shared/avatar'
import styles from './styles.module.css'

type TCommentIconProps = {
  comment: TComment
}

export const CommentItem = ({ comment }: TCommentIconProps) => {
  return (
    <li className={styles.container}>
      <p className={styles.text}>{comment.comment}</p>
      <div className={styles.userAndDateWrap}>
        <div className={styles.dateWrap}>
          <p>{comment.date}</p>
          <p>{comment.time}</p>
        </div>
        <div className={styles.userWrap}>
          <Avatar isProfile={false} />
          <p className={styles.userName}>{comment.author}</p>
        </div>
      </div>
    </li>
  )
}
