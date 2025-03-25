import { useState, useEffect, ChangeEvent } from 'react'
import { ButtonGoBack } from '../../shared/button-go-back'
import styles from './styles.module.css'
import { TForum } from '../../entities/topic-item/topic-item'
import { useParams } from 'react-router-dom'
import { forumTopics } from '../forum-page/accets'
import { Avatar } from '../../shared/avatar'
import { useSelector } from 'react-redux'
import { getUser } from '../../shared/store/selectors/userSelector'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { Input } from '../../shared/input'
import { DeleteIcon } from '../../assets/DeleteIcon'
import { SpadesIcon } from '../../assets/SpadesIcon'
import { SmileIcon } from '../../assets/SmileIcon'
import { mockComments } from './assets'
import { CommentItem } from '../../entities/comment-item/comment-item'

export type TComment = {
  id: number
  author_id: number
  author: string
  topic_id: number
  comment: string
  date: string
  time: string
}

export const ForumTopicPage = () => {
  useGetUserData()

  const { id } = useParams()
  const [isScrolling, setIsScrolling] = useState(false)
  const [topic, setTopic] = useState<TForum>()
  const [valueComment, setValueComment] = useState('')
  const [comments, setComments] = useState<TComment[]>([])

  const user = useSelector(getUser)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      if (commentList) {
        setIsScrolling(commentList.scrollTop > 0)
      }
    }

    const commentList = document.querySelector(`.${styles.commentList}`)
    commentList?.addEventListener('scroll', handleScroll)

    return () => {
      commentList?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const topic = forumTopics.find(item => String(item.id) === id)
    if (topic) {
      setTopic(topic)
    }
  }, [id])

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setValueComment(e.target.value)
  }

  useEffect(() => {
    if (topic) {
      setComments(mockComments.filter(item => item.topic_id === topic.id))
    }
  }, [topic])

  return (
    <main className={styles.page}>
      <ButtonGoBack />
      <div
        className={`${styles.topicContainer} ${
          isScrolling ? styles.topicContainerScrolling : ''
        }`}>
        <h1 className={styles.topicTitle}>{topic?.title}</h1>
        <div className={styles.topicInfo}>
          <div className={styles.topicDate}>
            <p className={styles.date}>{topic?.date}</p>
            <p className={styles.date}>{topic?.time}</p>
          </div>
          <div className={styles.topicDescription}>{topic?.description}</div>
          <div className={styles.topicAuthor}>
            {user?.id === topic?.author_id ? (
              <button className={styles.buttonDelete}>
                <DeleteIcon />
              </button>
            ) : (
              <Avatar isProfile={false} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.commentsContainer}>
        {comments.length !== 0 ? (
          <ul className={styles.commentList}>
            {comments.map(item => (
              <CommentItem comment={item} key={item.id} />
            ))}
          </ul>
        ) : (
          <p className={styles.commentListEmpty}>Тут пока нет сообщений</p>
        )}
      </div>
      <div className={styles.commentCreate}>
        <Input
          placeholder="Сообщение"
          value={valueComment}
          onChange={onChangeComment}
          name="comment"
          className={styles.inputComment}
        />
        <div className={styles.buttonsComment}>
          <button className={styles.buttonEmojy}>
            <SmileIcon />
          </button>
          <button className={styles.buttonSendComment}>
            <SpadesIcon />
          </button>
        </div>
      </div>
    </main>
  )
}
