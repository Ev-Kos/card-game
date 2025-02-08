import { FC } from 'react'

import styles from './styles.module.css'

type TAvatarProfileProps = {
  avatar: string
  onClick: VoidFunction
}

export const AvatarProfile: FC<TAvatarProfileProps> = ({ avatar, onClick }) => {
  return (
    <div className={styles.profileAvatar} onClick={onClick}>
      <img src={avatar} alt="Аватар" />
      <div className={styles.profileAvatarText}>
        Поменять <br /> аватар
      </div>
    </div>
  )
}
