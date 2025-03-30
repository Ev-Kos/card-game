import {
  createReply,
  deleteReply,
  findReplies,
  updateReply,
} from '../controllers/reply-controller'
import { Router } from 'express'

const replyRouter = Router()

replyRouter.get('/', findReplies)
replyRouter.post('/create', createReply)
replyRouter.put('/', updateReply)
replyRouter.delete('/', deleteReply)

export default replyRouter
