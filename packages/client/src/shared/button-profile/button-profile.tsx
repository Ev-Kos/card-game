import { useNavigate } from 'react-router-dom'

import { SpadesIcon } from '../../assets/SpadesIcon'

import styles from './styles.module.css'

export const ButtonProfile = () => {
  const navigate = useNavigate()

  return (
    <button className={styles.button} onClick={() => navigate('/profile')}>
      <p className={styles.text}>Профиль</p>
      <SpadesIcon width="33" height="30" />
    </button>
  )
}
