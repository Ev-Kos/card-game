import { useNavigate } from 'react-router-dom'

import { Button } from '../../shared/button'
import { ButtonProfile } from '../../shared/button-profile'

import styles from './styles.module.css'

export const MainMenuPage = () => {
  const navigate = useNavigate()

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
          <Button size="xl" color="contrast" onClick={() => navigate('/game')}>
            Продолжить
          </Button>

          <Button size="xl" color="contrast" onClick={() => navigate('/game')}>
            Новая игра
          </Button>

          <Button size="xl" color="contrast" onClick={() => navigate('/forum')}>
            Форумы
          </Button>

          <Button
            size="xl"
            color="contrast"
            onClick={() => navigate('/leaderboard')}>
            Статистика
          </Button>
        </div>
      </div>
      <div className={styles.buttonProfileContainer}>
        <ButtonProfile />
      </div>
    </div>
  )
}
