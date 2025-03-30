import { Router } from 'express'
import {
  createTopic,
  deleteTopic,
  findTopics,
  updateTopic,
} from '../controllers/topic-controller'
import { checkAuth } from '../middlewares/check-auth'

const topicRouter = Router()

topicRouter.get('/', checkAuth, findTopics)
topicRouter.post('/create', checkAuth, createTopic)
topicRouter.put('/', checkAuth, updateTopic)
topicRouter.delete('/', checkAuth, deleteTopic)

export default topicRouter
