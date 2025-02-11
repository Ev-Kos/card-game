import React from 'react'

import styles from './ForumPage.module.css'

import { Link } from 'react-router-dom'
import { ButtonGoBack } from '../../shared/button-go-back'

export const ForumsPage: React.FC = () => {
  return (
    <main className={styles.forumPage}>
      <Link className={styles.forumLink} to={'/#'}>
        <ButtonGoBack />
      </Link>
      <div className={styles.forumsContent}>
        <div className="forumsWrapper">
          <div className={styles.forumsTextFlex}>
            <h1 className={styles.forumsTitle}>Форумы</h1>
            <h2 className={styles.forumsSubtitle}>Темы</h2>
            <h2 className={styles.forumsSubtitle}>Ответы</h2>
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.forumsItems}>
              <div>
                <div className={styles.forumsItemsName}>Любимые игры</div>
              </div>

              <div className={styles.forumsItemsStats}>
                <div className={styles.forumsItemsTopics}>
                  102
                  <div className={styles.forumsItemsCircle}>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className={styles.forumsItemsReplies}>50</div>
              </div>
            </div>
          ))}
        </div>

        {/* <ProfileForm formData={formData} handleChange={handleChange} /> */}
      </div>
    </main>
  )
}
