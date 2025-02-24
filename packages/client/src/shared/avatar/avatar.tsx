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
  isProfile: boolean
  onClick?: VoidFunction
}

export const Avatar = ({
  size = 's',
  url,
  isProfile = false,
  onClick,
}: TAvatarProps) => {
  const avatarClassName = classNames(
    styles.avatarContainer,
    styles[`avatar-${size}`],
  )

  const avatarClassNameProfile = classNames(
    styles.avatarContainerProfile,
    styles[`avatar-${size}`],
  )

  return (
    <div
      className={isProfile ? avatarClassNameProfile : avatarClassName}
      onClick={onClick}>
      {url ? (
        <img src={url} alt="Аватар" className={styles.avatarImg} />
      ) : (
        <img
          src={getAvatarPlaceholder()}
          alt="Аватар"
          className={styles[`image-${size}`]}
        />
      )}
      {isProfile && (
        <div className={styles.profileAvatarText}>
          Поменять <br /> аватар
        </div>
      )}
    </div>
  )
}
