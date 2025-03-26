import {
  createComment,
  deleteComment,
  findComments,
} from '../controllers/comment-controller'
import { Router } from 'express'

const commentRouter = Router()

commentRouter.post('/', findComments)
commentRouter.post('/create', createComment)
commentRouter.delete('/', deleteComment)

export default commentRouter
