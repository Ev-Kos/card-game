import { Router } from 'express'
import { findTopics } from '../controllers/topic-controller'

const topicRouter = Router()

topicRouter.post('/', findTopics)

export default topicRouter
