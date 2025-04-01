import { useState, useEffect, ChangeEvent } from 'react'
import { ButtonGoBack } from '../../shared/button-go-back'
import styles from './styles.module.css'
import { useParams } from 'react-router-dom'
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
import { topicsSelectors } from '../../shared/store/selectors/topicsSelector'
import { TTopic } from '../../shared/hooks/api/getTopics'
import { Button } from '../../shared/button'
import { getDate } from '../../shared/utils/get-date'

export type TComment = {
  id: string
  author_id: number
  author: string
  topic_id: string
  comment: string
  date: string
  time: string
}

export const ForumTopicPage = () => {
  useGetUserData()

  const { id } = useParams()
  const [isScrolling, setIsScrolling] = useState(false)
  const [topic, setTopic] = useState<TTopic>()
  const [valueComment, setValueComment] = useState('')
  const [comments, setComments] = useState<TComment[]>([])
  const topics = useSelector(topicsSelectors.getTopics)
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
    const topic = topics.find(item => String(item.id) === id)
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
            <p className={styles.date}>{getDate(String(topic?.createdAt))}</p>
            <p className={styles.date}>
              {getDate(String(topic?.createdAt), true)}
            </p>
          </div>
          <div className={styles.topicDescription}>{topic?.description}</div>
          <div className={styles.topicAuthor}>
            {user?.login === topic?.author_login ? (
              <>
                <button className={styles.buttonDelete}>
                  <DeleteIcon />
                </button>
                <button className={styles.buttonEdit}>Редактировать</button>
              </>
            ) : (
              <>
                <Avatar isProfile={false} />
                <p className={styles.topicAuthorLogin}>{topic?.author_login}</p>
              </>
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
