import { useEffect } from 'react'

import { addHeaderShadowWhileScroll } from '../../utils/addHeaderShadowWhileScroll'
import { rateList } from './assets'
import { ButtonGoBack } from '../../shared/button-go-back'
import { RatingCard } from '../../entities/rating-card'

import styles from './styles.module.css'

const changeHeaderStyle = () => {
  addHeaderShadowWhileScroll('header', 'rateItem')
}

export const RatingPage = () => {
  useEffect(() => {
    const targetBlock = document.getElementById('rateList')

    targetBlock?.addEventListener('scroll', changeHeaderStyle)

    return () => targetBlock?.removeEventListener('scroll', changeHeaderStyle)
  }, [])

  return (
    <div className={styles.pageContentContainer}>
      <ButtonGoBack />
      <div id="header" className={styles.headerContainer}>
        <h1 className={styles.title}>Статистика</h1>
      </div>

      <div id="rateList" className={styles.rateListContainer}>
        {rateList.map((rateItem, idx) => (
          <RatingCard
            key={idx}
            cardId={idx}
            userName={rateItem.name}
            score={rateItem.score}
            avatarUrl={rateItem.avatarUrl}
          />
        ))}
      </div>
    </div>
  )
}
