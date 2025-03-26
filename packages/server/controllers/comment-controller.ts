import {
  createCommentService,
  deleteCommentService,
  findCommentsService,
} from '../services/comment-service'
import { checkAuth } from '../middlewares/check-auth'
import { badRequestError, conflictError, errorHandler } from '../utils/errors'
import { Request, Response } from 'express'
import { comment } from '../db'
import { TComment } from '../models/comment-modal'

export const findComments = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, offset } = req.body
      const comments = await findCommentsService(Number(limit), Number(offset))

      if (comments.length === 0) {
        res.status(200).json([])
      } else {
        res.status(200).json(comments)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const createComment = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { topic_id, comment } = req.body
      const user = req.user

      if (!topic_id || !comment) {
        badRequestError(res, 'topic_id and comment are required fields')
        return
      }

      if (user) {
        const newComment = await createCommentService(
          topic_id,
          comment,
          user.login,
        )
        res.status(201).json(newComment)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const deleteComment = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { comment_id } = req.body
      const user = req.user

      const commentToDelete = (await comment.findOne({
        where: { id: comment_id },
      })) as TComment | null

      if (!commentToDelete) {
        badRequestError(res, 'comment not found')
        return
      }

      if (commentToDelete.author_login !== user?.login) {
        conflictError(res, 'only the author can delete')
        return
      }

      if (
        commentToDelete.replies_count &&
        commentToDelete.replies_count !== 0
      ) {
        conflictError(res, 'comment has replies')
        return
      }

      const result = await deleteCommentService(comment_id)

      res.status(200).send(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
]
