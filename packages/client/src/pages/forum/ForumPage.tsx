import React, { useEffect, useState } from 'react'

import styles from './ForumPage.module.css'
import { ModalProfile } from '../../entities/forum/modalProfile'
import { ForumItem } from '../../entities/forum/forumItem'
import { Button } from '../../shared/button'
import { Link } from 'react-router-dom'
import { ArrowBackButton } from '../../shared/arrowBackButton'
import { ButtonGoBack } from '../../shared/button-go-back'
// import { Button } from '../../shared/button';

export const ForumPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      if (topicsList) {
        setIsScrolling(topicsList.scrollTop > 0)
      }
    }

    const topicsList = document.querySelector(`.${styles.forumPageList}`)
    topicsList?.addEventListener('scroll', handleScroll)

    return () => {
      topicsList?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const forumTopics = [
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
    {
      title: 'Новая колода карт',
      author: 'Иван Иванов',
      description:
        'Сегодня я хотел бы обсудить новую колоду карт, которая недавно вышла. Кто-нибудь уже пробовал её в игре? Как впечатления?',
      date: '11.01.2025',
      time: '13:36',
    },
  ]

  return (
    <main className={styles.forumPage}>
      <Link className={styles.forumLink} to={'/#'}>
        <ButtonGoBack />
      </Link>
      <div
        className={`${styles.forumHeaderBlock} ${
          isScrolling ? styles.forumHeaderBlockScrolling : ''
        }`}>
        <h1 className={styles.forumPageTitle}>Форум по карточным играм</h1>
      </div>
      <div className={styles.forumPageContent}>
        <ul className={styles.forumPageList}>
          {forumTopics.map((item, i) => (
            <ForumItem
              key={i}
              title={item.title}
              author={item.author}
              description={item.description}
              date={item.date}
              time={item.time}
            />
          ))}
        </ul>

        <div className={styles.forumPageButton}>
          <Button
            color="secondary"
            size="m"
            onClick={() => setIsModalOpen(true)}>
            Добавить тему
          </Button>
        </div>
      </div>
      <ModalProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  )
}
