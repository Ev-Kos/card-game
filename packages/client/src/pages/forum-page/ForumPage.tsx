import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '../../shared/button'
import { ButtonGoBack } from '../../shared/button-go-back'
import { Input } from '../../shared/input'
import { Modal } from '../../entities/modal'
import { Textarea } from '../../shared/textarea/textarea'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { TopicItem } from '../../entities/topic-item/topic-item'
import { useSelector } from 'react-redux'
import { topicsSelectors } from '../../shared/store/selectors/topicsSelector'
import {
  fetchTopics,
  getTopicsAction,
} from '../../shared/store/slices/topicsSlice'
import { useAppDispatch } from '../../shared/store/store'
import { Notice } from '../../shared/notice/notice'
import { getUser } from '../../shared/store/selectors/userSelector'
import { createTopicData } from '../../shared/hooks/api/createTopic'

export const ForumPage = () => {
  useGetUserData()

  const dispatch = useAppDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDiscriptionValue] = useState('')
  const limit = 10
  const topics = useSelector(topicsSelectors.getTopics)
  const { request, success, failed } = useSelector(
    topicsSelectors.getStatusFlags,
  )

  const userData = useSelector(getUser)
  const topicsListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!hasMore) return

    const getTopicsData = async () => {
      try {
        const result = await dispatch(fetchTopics({ limit, offset })).unwrap()
        if (result.length < limit) setHasMore(false)
      } catch (e) {
        console.error('Ошибка получения тем:', e)
      }
    }

    getTopicsData()
  }, [offset])

  const handleScroll = useCallback(() => {
    if (!topicsListRef.current) return

    const { scrollTop } = topicsListRef.current

    setIsScrolling(scrollTop > 0)
    if (request || !hasMore) return

    const { clientHeight, scrollHeight } = topicsListRef.current
    const isBottomReached = scrollHeight - (scrollTop + clientHeight) < 100

    if (isBottomReached) {
      setOffset(prev => prev + limit)
    }
  }, [request, hasMore])

  useEffect(() => {
    const listElement = topicsListRef.current
    listElement?.addEventListener('scroll', handleScroll)

    return () => {
      listElement?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }

  const onChangeDiscription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDiscriptionValue(e.target.value)
  }

  const createTopic = async () => {
    if (titleValue.length !== 0 && descriptionValue.length !== 0) {
      try {
        const newTopic = await createTopicData({
          title: titleValue,
          description: descriptionValue,
          author_login: userData?.login,
        })
        dispatch(getTopicsAction(newTopic))
        setTitleValue('')
        setDiscriptionValue('')
        setModalOpen(false)
      } catch (error) {
        console.error('Ошибка создания темы:', error)
      }
    }
  }
  return (
    <main className={styles.forumPage}>
      <ButtonGoBack />
      <div
        className={`${styles.forumHeaderBlock} ${
          isScrolling ? styles.forumHeaderBlockScrolling : ''
        }`}>
        <h1 className={styles.forumPageTitle}>Форум</h1>
      </div>
      <div className={styles.forumPageContent}>
        <ul className={styles.forumPageList} ref={topicsListRef}>
          {topics.map(item => (
            <TopicItem key={item.id} topic={item} />
          ))}
          {request && <Notice text="Загрузка..." />}
          {!hasMore && <Notice text="Все темы загружены" />}
        </ul>
        <div className={styles.forumPageButton}>
          <Button color="secondary" size="m" onClick={handleModal}>
            Добавить тему
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal title="Добавление темы" closeModal={handleModal}>
          <form className={styles.modalForm}>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Тема:</label>
              <Input type="text" value={titleValue} onChange={onChangeTitle} />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Описание:</label>
              <Textarea
                value={descriptionValue}
                onChange={onChangeDiscription}
              />
            </div>

            <div className={styles.modalProfileButtonCenter}>
              <Button size="m" type="button" onClick={createTopic}>
                Добавить
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  )
}
