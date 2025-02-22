import styles from './styles.module.css'
import { FC, MouseEventHandler } from 'react'

type TModalOverlay = {
  closeModal: MouseEventHandler<HTMLDivElement>
}

export const ModalOverlay = ({ closeModal }: TModalOverlay) => {
  return <div className={styles.overlay} onClick={closeModal}></div>
}
