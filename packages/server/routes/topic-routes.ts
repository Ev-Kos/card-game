import { Router } from 'express'
import {
  createTopic,
  deleteTopic,
  findTopics,
  updateTopic,
} from '../controllers/topic-controller'

const topicRouter = Router()

topicRouter.get('/', findTopics)
topicRouter.post('/create', createTopic)
topicRouter.put('/', updateTopic)
topicRouter.delete('/', deleteTopic)

export default topicRouter
