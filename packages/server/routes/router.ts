import { Router, Response } from 'express'
import topicRouter from './topic-routes'
import { notFoundError } from '../utils/errors'
import commentRouter from './comment-routes'
import replyRouter from './reply-routes'

const router = Router()
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})

router.use('/forum', topicRouter)
router.use('/forum/topic', commentRouter)
router.use('/forum/topic/replies', replyRouter)

router.use((res: Response) => {
  notFoundError(res, 'Маршрут не найден')
})

export default router
