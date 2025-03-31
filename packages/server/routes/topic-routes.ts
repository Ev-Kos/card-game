import { Router } from 'express'
import {
  createTopic,
  deleteTopic,
  findTopics,
  updateTopic,
} from '../controllers/topic-controller'
import { checkAuth } from '../middlewares/check-auth'

const topicRouter = Router()

topicRouter.get('/', findTopics)
topicRouter.post('/create', createTopic)
topicRouter.put('/', checkAuth, updateTopic)
topicRouter.delete('/', checkAuth, deleteTopic)

export default topicRouter
