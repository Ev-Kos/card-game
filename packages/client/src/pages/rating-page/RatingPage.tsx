import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { ButtonGoBack } from '../../shared/button-go-back'
import { RatingCard } from '../../entities/rating-card'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { leaderboardSelectors } from '../../shared/store/selectors/leaderboardSelector'
import { useAppDispatch } from '../../shared/store/store'
import {
  fetchLeaderboard,
  setLeaderboardAction,
} from '../../shared/store/slices/leaderboardSlise'
import { Notice } from '../../shared/notice/notice'
import { teamName } from '../../assets/assets'

const limit = 10

export const RatingPage = () => {
  useGetUserData()

  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const leaderboard = useSelector(leaderboardSelectors.getLeaderboard)
  const { request } = useSelector(leaderboardSelectors.getStatusFlags)
  const leaderboardRef = useRef<HTMLUListElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLeaderboardAction([]))
  }, [])

  useEffect(() => {
    if (!hasMore) return

    const getLeaderBoardData = async () => {
      try {
        const data = {
          ratingFieldName: 'login_deckMasters',
          cursor: offset,
          limit: limit,
        }
        const result = await dispatch(
          fetchLeaderboard({ data, teamName }),
        ).unwrap()

        if (result && result.length < limit) {
          setHasMore(false)
        }
      } catch (e) {
        console.error('Ошибка получения leaderboard:', e)
      }
    }

    getLeaderBoardData()
  }, [offset])

  const handleScroll = useCallback(() => {
    if (!leaderboardRef.current) return

    const { scrollTop } = leaderboardRef.current

    setIsScrolling(scrollTop > 0)
    if (request || !hasMore) return

    const { clientHeight, scrollHeight } = leaderboardRef.current
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 100

    if (isBottom) {
      setOffset(prev => prev + limit)
    }
  }, [request, hasMore])

  useEffect(() => {
    const listElement = leaderboardRef.current
    listElement?.addEventListener('scroll', handleScroll)

    return () => {
      listElement?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const isShowNoticeAllDataLoaded =
    leaderboard.length % limit === 0 ? false : true

  const leaderBoardSort = useMemo(() => {
    return leaderboard
      .slice()
      .sort((a, b) => b.data.numberOfWins - a.data.numberOfWins)
  }, [leaderboard])

  return (
    <div className={styles.pageContentContainer}>
      <ButtonGoBack />
      <div
        className={`${styles.headerContainer} ${
          isScrolling ? styles.headerContainerScrolling : ''
        }`}>
        <h1 className={styles.title}>Статистика</h1>
      </div>
      <ul ref={leaderboardRef} className={styles.rateListContainer}>
        {leaderBoardSort.map((rateItem, idx) => (
          <RatingCard
            key={idx}
            cardIdx={idx}
            userName={rateItem.data.login_deckMasters}
            score={rateItem.data.numberOfWins}
            avatarUrl={rateItem.data.avatarUrl}
          />
        ))}
        {request && <Notice text="Загрузка..." />}
        {!hasMore && !isShowNoticeAllDataLoaded && (
          <Notice text="Все игроки загружены" />
        )}
      </ul>
    </div>
  )
}
