import { useNavigate } from 'react-router-dom'

import { ArrowLeft } from '../../assets/ArrowLeft'

import styles from './styles.module.css'

export const ButtonGoBack = () => {
  const navigate = useNavigate()

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <ArrowLeft />
    </button>
  )
}
