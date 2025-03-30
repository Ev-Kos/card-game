import { checkAuth } from '../middlewares/check-auth'
import {
  createReply,
  deleteReply,
  findReplies,
  updateReply,
} from '../controllers/reply-controller'
import { Router } from 'express'

const replyRouter = Router()

replyRouter.get('/', checkAuth, findReplies)
replyRouter.post('/create', checkAuth, createReply)
replyRouter.put('/', checkAuth, updateReply)
replyRouter.delete('/', checkAuth, deleteReply)

export default replyRouter
