export const CARD_WIDTH = 71
export const CARD_HEIGHT = 99

export const routes = {
  login: '/',
  main: '/main',
  registration: '/registration',
  forum: '/forum',
  topicId: '/forum/topic/:id',
  game: '/game',
  leaderboard: '/leaderboard',
  profile: '/profile',
  error: '/error',
}

export const redirect_uri = __EXTERNAL_SERVER_URL__ || 'http://localhost:3000'

export const yandexAuthUrl = (service_id: string, redirect_uri: string) => {
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
}

export const teamName = 'deckMasters'
