import { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { createPortal } from 'react-dom'
import { ModalOverlay } from '../../shared/modal-overlay/modal-overlay'
import { ButtonClose } from '../../shared/button-close/button-close'

type TModalProps = {
  children: ReactNode
  title: string
  closeModal: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

export const Modal = ({ children, title, closeModal }: TModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setModalRoot(document.getElementById('modal') as HTMLDivElement)
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal
      }
    }
    document.addEventListener('keydown', closeEsc)

    return () => {
      document.removeEventListener('keydown', closeEsc)
    }
  }, [])

  if (!modalRoot) return null

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={styles.container}>
        <ButtonClose color="contrast" onClick={closeModal} />
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </>,
    modalRoot,
  )
}
