import { checkAuth } from '../middlewares/check-auth'
import {
  createComment,
  deleteComment,
  findComments,
  updateComment,
} from '../controllers/comment-controller'
import { Router } from 'express'

const commentRouter = Router()

commentRouter.get('/', checkAuth, findComments)
commentRouter.post('/create', checkAuth, createComment)
commentRouter.put('/', checkAuth, updateComment)
commentRouter.delete('/', checkAuth, deleteComment)

export default commentRouter
