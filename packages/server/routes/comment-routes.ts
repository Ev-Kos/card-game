import { checkAuth } from '../middlewares/check-auth'
import {
  createComment,
  deleteComment,
  findComments,
  updateComment,
} from '../controllers/comment-controller'
import { Router } from 'express'

const commentRouter = Router()

commentRouter.get('/', findComments)
commentRouter.post('/create', createComment)
commentRouter.put('/', checkAuth, updateComment)
commentRouter.delete('/', deleteComment)

export default commentRouter
