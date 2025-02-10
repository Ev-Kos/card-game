import classNames from 'classnames'

import { avatarPlaceholder } from './assets'
import { getRandomInt } from '../utils/getRandomInt'

import styles from './styles.module.css'

export const getAvatarPlaceholder = () => {
  return avatarPlaceholder[getRandomInt(0, avatarPlaceholder.length - 1)]
}

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
