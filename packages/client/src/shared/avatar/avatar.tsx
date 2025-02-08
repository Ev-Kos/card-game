import classNames from 'classnames'

import { getAvatarPlaceholder } from '../../utils/getAvatarPlaceholder'

import styles from './styles.module.css'

type TAvatarProps = {
  /**
   * Размер аватара
   * @default 's'
   */
  size?: 's' | 'm' | 'l'
  url?: string
}

export const Avatar = ({ size = 's', url }: TAvatarProps) => {
  const avatarClassName = classNames(
    styles.avatarContainer,
    styles[`avatar-${size}`],
  )

  return (
    <div className={avatarClassName}>
      {url ? (
        <img src={url} alt="Аватар" className={styles.avatarImg} />
      ) : (
        <img
          src={getAvatarPlaceholder()}
          alt="Аватар"
          className={styles[`image-${size}`]}
        />
      )}
    </div>
  )
}
