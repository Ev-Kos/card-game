import styles from './styles.module.css'
import { Button } from '../../shared/button'
import { Link } from 'react-router-dom'

export type TTopic = {
  id: number
  title: string
  author_id: number
  author: string
  description: string
  date: string
  time: string
}

type TTopicItemProps = {
  topic: TTopic
}

export const TopicItem = ({ topic }: TTopicItemProps) => {
  return (
    <Link to={`/forum/topic/${topic.id}`}>
      <li className={styles.forumPageItem}>
        <div className={styles.forumPageItemLeft}>
          <h2 className={styles.forumPageItemTitle}>Тема: {topic.title}</h2>
          <p className={styles.forumPageItemSubtitle}>Автор: {topic.author}</p>
          <p className={styles.forumPageItemDescription}>{topic.description}</p>
        </div>

        <div className={styles.forumPageItemRight}>
          <div className={styles.forumPageItemData}>
            {topic.date} <span>{topic.time}</span>
          </div>
          <Button size="s">Комментировать</Button>
        </div>
      </li>
    </Link>
  )
}
