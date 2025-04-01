import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../../shared/error-boundary/error-boundary'
import styles from './syles.module.css'
import BackgroundImage from '../../assets/BackgroundImage.svg'
import Logo from '../../assets/Logo.svg'
import imports from '../../features/game/imports'
import { usePage } from '../../shared/hooks/usePage'
import { PageInitArgs } from '../../shared/routes/routes'
import { getUserData } from '../../shared/hooks/api/getUserData'
import { isAxiosSuccessResponse } from '../../shared/utils/isAxiosSuccessResponse'
import { getUserAction } from '../../shared/store/slices/userSlice'

const { initialDeckCard, cards } = imports

export const Root = () => {
  usePage({ initPage: initPages })

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

export const initPages = async ({ dispatch, state }: PageInitArgs) => {
  if (!state.userSlice.user) {
    const result = await getUserData()

    if (result.status === 200 && isAxiosSuccessResponse(result, 'data')) {
      return dispatch(getUserAction(result.data))
    }
  }
}
