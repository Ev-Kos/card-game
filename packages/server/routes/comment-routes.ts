import {
  createComment,
  deleteComment,
  findComments,
  updateComment,
} from '../controllers/comment-controller'
import { Router } from 'express'

const commentRouter = Router()

commentRouter.post('/', findComments)
commentRouter.post('/create', createComment)
commentRouter.put('/', updateComment)
commentRouter.delete('/', deleteComment)

export default commentRouter
