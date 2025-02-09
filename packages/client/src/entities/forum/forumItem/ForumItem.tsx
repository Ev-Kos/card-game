import React from 'react'

import styles from './ForumItem.module.css'
import { Button } from '../../../shared/button'

interface ForumItemProps {
  title: string
  author: string
  description: string
  date: string
  time: string
}

export const ForumItem: React.FC<ForumItemProps> = ({
  title,
  author,
  description,
  date,
  time,
}) => {
  return (
    <li className={styles.forumPageItem}>
      <div className={styles.forumPageItemLeft}>
        <h2 className={styles.forumPageItemTitle}>Тема: {title}</h2>
        <p className={styles.forumPageItemSubtitle}>Автор: {author}</p>
        <p className={styles.forumPageItemDescription}>{description}</p>
      </div>

      <div className={styles.forumPageItemRight}>
        <div className={styles.forumPageItemData}>
          {date} <span>{time}</span>
        </div>
        <Button size="s">Комментировать</Button>
      </div>
    </li>
  )
}
