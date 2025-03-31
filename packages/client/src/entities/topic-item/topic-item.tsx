import styles from './styles.module.css'
import { Button } from '../../shared/button'
import { Link } from 'react-router-dom'
import { TTopic } from '../../shared/hooks/api/getTopics'
import { getDate } from '../../shared/utils/get-date'

type TTopicItemProps = {
  topic: TTopic
}

export const TopicItem = ({ topic }: TTopicItemProps) => {
  return (
    <Link to={`/forum/topic/${topic.id}`}>
      <li className={styles.forumPageItem}>
        <div className={styles.forumPageItemLeft}>
          <h2 className={styles.forumPageItemTitle}>Тема: {topic.title}</h2>
          <p className={styles.forumPageItemSubtitle}>
            Автор: {topic.author_login}
          </p>
          <p className={styles.forumPageItemDescription}>{topic.description}</p>
        </div>

        <div className={styles.forumPageItemRight}>
          <div className={styles.forumPageItemData}>
            {getDate(topic.createdAt)}{' '}
            <span>{getDate(topic.createdAt, true)}</span>
          </div>
          <Button size="s">Комментировать</Button>
        </div>
      </li>
    </Link>
  )
}
