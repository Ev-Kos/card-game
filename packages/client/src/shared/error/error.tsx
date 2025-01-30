import React from 'react'

import { Button } from '../button'

import styles from './styles.module.css'

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

      <Button size="l" color="contrast" label="Играть дальше" />
    </div>
  )
}
