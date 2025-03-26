import { Router } from 'express'
import {
  createTopic,
  deleteTopic,
  findTopics,
} from '../controllers/topic-controller'

const topicRouter = Router()

topicRouter.post('/', findTopics)
topicRouter.post('/create', createTopic)
topicRouter.delete('/', deleteTopic)

export default topicRouter
