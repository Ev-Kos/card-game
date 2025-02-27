import styles from './styles.module.css'
import { Button } from '../../shared/button'
import { Link } from 'react-router-dom'

export type TForum = {
  id: number
  title: string
  author_id: number
  author: string
  description: string
  date: string
  time: string
}

type TForumItemProps = {
  forum: TForum
}

export const ForumItem = ({ forum }: TForumItemProps) => {
  return (
    <Link to={`/forum/${forum.id}`}>
      <li className={styles.forumPageItem}>
        <div className={styles.forumPageItemLeft}>
          <h2 className={styles.forumPageItemTitle}>Тема: {forum.title}</h2>
          <p className={styles.forumPageItemSubtitle}>Автор: {forum.author}</p>
          <p className={styles.forumPageItemDescription}>{forum.description}</p>
        </div>

        <div className={styles.forumPageItemRight}>
          <div className={styles.forumPageItemData}>
            {forum.date} <span>{forum.time}</span>
          </div>
          <Button size="s">Комментировать</Button>
        </div>
      </li>
    </Link>
  )
}
