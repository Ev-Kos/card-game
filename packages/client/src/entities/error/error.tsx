import React from 'react'
import { ButtonLink } from '../../shared/button'
import styles from './styles.module.css'
import { routes } from '../../assets/assets'

type TErrorProps = {
  description: string
  text: string
  children: React.ReactNode
}

export const Error = ({ description, text, children }: TErrorProps) => {
  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.textContentContainer}>
        <div className={styles.titleContainer}>{children}</div>

        <div className={styles.descriptionContainer}>
          <h1 className={styles.description}>{description}</h1>
          <p className={styles.text}>{text}</p>
        </div>
      </div>

      <ButtonLink size="l" color="contrast" to={routes.main}>
        Играть дальше
      </ButtonLink>
    </div>
  )
}
