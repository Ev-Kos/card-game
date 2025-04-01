import { ChangeEvent, MouseEventHandler } from 'react'
import { Modal } from '../modal/modal'
import styles from './styles.module.css'
import { Input } from '../../shared/input'
import { Textarea } from '../../shared/textarea/textarea'
import { Button } from '../../shared/button'

type TModalTopicProps = {
  title: string
  closeModal: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  titleValue: string
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  descriptionValue: string
  onChangeDiscription: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onClick: VoidFunction
  buttonText: string
}

export const ModalTopic = ({
  title,
  closeModal,
  titleValue,
  onChangeTitle,
  descriptionValue,
  onChangeDiscription,
  onClick,
  buttonText,
}: TModalTopicProps) => {
  return (
    <Modal title={title} closeModal={closeModal}>
      <form className={styles.modalForm}>
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Тема:</label>
          <Input type="text" value={titleValue} onChange={onChangeTitle} />
        </div>
        <div className={styles.modalField}>
          <label className={styles.modalLabel}>Описание:</label>
          <Textarea value={descriptionValue} onChange={onChangeDiscription} />
        </div>

        <div className={styles.modalProfileButtonCenter}>
          <Button size="m" type="button" onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
