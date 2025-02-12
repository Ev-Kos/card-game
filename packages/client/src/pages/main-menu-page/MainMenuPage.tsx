import { routes } from '../../assets/assets'
import { SpadesIcon } from '../../assets/SpadesIcon'
import { ButtonLink } from '../../shared/button'

import styles from './styles.module.css'

export const MainMenuPage = () => {
  return (
    <div className={styles.pageContentContainer}>
      <h1 className={styles.title}>Дурак</h1>

      <div className={styles.menuContainer}>
        <p className={styles.description}>
          <b>Дурак</b> - карточная игра, развивающая логическое мышление.
          <br />В каждом ходе скрывается возможность стратегического маневра,
          что придаёт игре <b>особый шарм</b>.
          <br />
          Игроки учатся не только защищать свои карты, но и использовать{' '}
          <b>хитрость</b>, чтобы одержать верх над соперниками.
          <br />
          Кроме того, Дурак может стать отличным способом <b>
            расслабиться
          </b>{' '}
          после тяжелого дня.
          <br />
          Игра в Дурака — это не просто развлечение, это <b>яркое событие!</b>
        </p>

        <div className={styles.menuButtonsContainer}>
          <ButtonLink size="xl" color="contrast" to={routes.game}>
            Продолжить
          </ButtonLink>

          <ButtonLink size="xl" color="contrast" to={routes.game}>
            Новая игра
          </ButtonLink>

          <ButtonLink size="xl" color="contrast" to={routes.forum}>
            Форумы
          </ButtonLink>

          <ButtonLink size="xl" color="contrast" to={routes.leaderboard}>
            Статистика
          </ButtonLink>
        </div>
      </div>

      <div className={styles.buttonProfileContainer}>
        <ButtonLink className={styles.buttonToProfile} to={routes.profile}>
          <p className={styles.buttonToProfileText}>Профиль</p>
          <SpadesIcon className={styles.spadesIcon} width="33" height="30" />
        </ButtonLink>
      </div>
    </div>
  )
}
