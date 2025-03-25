import { Router } from 'express'
import { createTopic, findTopics } from '../controllers/topic-controller'

const topicRouter = Router()

topicRouter.post('/', findTopics)
topicRouter.post('/create', createTopic)

export default topicRouter
