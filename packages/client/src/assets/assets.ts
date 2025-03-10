export const CARD_WIDTH = 71
export const CARD_HEIGHT = 99

export const routes = {
  login: '/',
  main: '/main',
  registration: '/registration',
  forum: '/forum',
  forumId: '/forum/:id',
  game: '/game',
  leaderboard: '/leaderboard',
  profile: '/profile',
  error: '/error',
}

export const redirect_uri = `${import.meta.env._EXTERNAL_SERVER_URL || 'http://localhost:3000'}`
