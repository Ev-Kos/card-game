import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../../shared/error-boundary/error-boundary'
import styles from './syles.module.css'
import BackgroundImage from '../../assets/BackgroundImage.svg'
import Logo from '../../assets/Logo.svg'
import imports from '../../features/game/imports'

const { initialDeckCard, cards } = imports

export const Root = () => {
  return (
    <ErrorBoundary>
      <Outlet />
      <img src={Logo} className={styles.logo} alt="Desc Masters" />
      <img src={BackgroundImage} className={styles.backgroundImage} />

      <div className={styles.preloadImagesContainer}>
        {[...initialDeckCard, ...cards].map(({ image }) => (
          <img key={image} src={image} />
        ))}
      </div>
    </ErrorBoundary>
  )
}
