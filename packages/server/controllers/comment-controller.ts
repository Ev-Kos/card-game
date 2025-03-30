import {
  createCommentService,
  deleteCommentService,
  findCommentsService,
  updateCommentService,
} from '../services/comment-service'
import { checkAuth } from '../middlewares/check-auth'
import { badRequestError, conflictError, errorHandler } from '../utils/errors'
import { Request, Response } from 'express'
import { comment, reply } from '../db'

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
      const { topic_id, comment_text } = req.body
      const user = req.user

      if (!topic_id || !comment_text) {
        badRequestError(res, 'topic_id and comment are required fields')
        return
      }

      if (user) {
        const newComment = await createCommentService(
          topic_id,
          comment_text,
          user.login,
        )
        res.status(201).json(newComment)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const updateComment = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { comment_id, comment_text } = req.body
      const user = req.user

      const commentToUpdate = await comment.findOne({
        where: { id: comment_id },
      })

      if (!commentToUpdate) {
        badRequestError(res, 'comment not found')
        return
      }

      if (commentToUpdate.author_login !== user?.login) {
        conflictError(res, 'only the author can update')
        return
      }

      const replies = await reply.findOne({
        where: { comment_id: commentToUpdate.id },
      })

      if (replies) {
        conflictError(res, 'comment has replies')
        return
      }

      const result = await updateCommentService(comment_id, { comment_text })

      res.status(200).send(result)
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

      const commentToDelete = await comment.findOne({
        where: { id: comment_id },
      })

      if (!commentToDelete) {
        badRequestError(res, 'comment not found')
        return
      }

      if (commentToDelete.author_login !== user?.login) {
        conflictError(res, 'only the author can delete')
        return
      }

      const replies = await reply.findOne({
        where: { comment_id: commentToDelete.id },
      })

      if (replies) {
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
