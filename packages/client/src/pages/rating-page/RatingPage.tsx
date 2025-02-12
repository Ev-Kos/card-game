import { useEffect } from 'react'

import { addHeaderShadowWhileScroll } from '../../shared/utils/addHeaderShadowWhileScroll'
import { rateList } from './assets'
import { useGetUserData } from '../../shared/hooks/api/useGetUserData'
import { ButtonGoBack } from '../../shared/button-go-back'
import { RatingCard } from '../../entities/rating-card'

import styles from './styles.module.css'

const rateItemId = 'rateItem'
const rateListId = 'rateList'
const headerId = 'header'

const changeHeaderStyle = () => {
  addHeaderShadowWhileScroll(headerId, rateItemId)
}

export const RatingPage = () => {
  useGetUserData()

  useEffect(() => {
    const targetBlock = document.getElementById(rateListId)
    targetBlock?.addEventListener('scroll', changeHeaderStyle)

    return () => targetBlock?.removeEventListener('scroll', changeHeaderStyle)
  }, [])

  return (
    <div className={styles.pageContentContainer}>
      <ButtonGoBack />
      <div id={headerId} className={styles.headerContainer}>
        <h1 className={styles.title}>Статистика</h1>
      </div>

      <div id={rateListId} className={styles.rateListContainer}>
        {rateList.map((rateItem, idx) => (
          <RatingCard
            cardId={rateItemId}
            key={idx}
            cardIdx={idx}
            userName={rateItem.name}
            score={rateItem.score}
            avatarUrl={rateItem.avatarUrl}
          />
        ))}
      </div>
    </div>
  )
}
