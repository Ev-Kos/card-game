import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '../../shared/button'
import { ButtonGoBack } from '../../shared/button-go-back'
import { forumTopics } from './accets'
import { Input } from '../../shared/input'
import { Modal } from '../../entities/modal'
import { Textarea } from '../../shared/textarea/textarea'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { TopicItem } from '../../entities/topic-item/topic-item'
import { useSelector } from 'react-redux'
import { topicsSelectors } from '../../shared/store/selectors/topicsSelector'
import { fetchTopics } from '../../shared/store/slices/topicsSlice'
import { useAppDispatch } from '../../shared/store/store'

export const ForumPage = () => {
  useGetUserData()

  const dispatch = useAppDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 10
  const topics = useSelector(topicsSelectors.getTopics)
  const { request, success, failed } = useSelector(
    topicsSelectors.getStatusFlags,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTopics({ limit, offset }))
      } catch (e) {
        console.error('Ошибка получения тем:', e)
      }
    }

    fetchData()
  }, [offset, dispatch])

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

  const handleModal = () => {
    setModalOpen(!isModalOpen)
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
        <ul className={styles.forumPageList}>
          {forumTopics.map(item => (
            <TopicItem key={item.id} topic={item} />
          ))}
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
              <Input type="text" />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Описание:</label>
              <Textarea />
            </div>

            <div className={styles.modalProfileButtonCenter}>
              <Button size="m" type="button">
                Добавить
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  )
}
