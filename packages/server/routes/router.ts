import { Router, Response } from 'express'
// import { checkAuth } from '../middlewares/check-auth';
import topicRouter from './topic-routes'
import { notFoundError } from '../utils/errors'

const router = Router()
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})

router.use('/forum', topicRouter)

router.use((res: Response) => {
  notFoundError(res, 'Маршрут не найден')
})

export default router
