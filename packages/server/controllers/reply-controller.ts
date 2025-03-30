import {
  createReplyService,
  deleteReplyService,
  findRepliesService,
  updateReplyService,
} from '../services/reply-service'
import { checkAuth } from '../middlewares/check-auth'
import { badRequestError, conflictError, errorHandler } from '../utils/errors'
import { Request, Response } from 'express'
import { reply } from '../db'

export const findReplies = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, offset } = req.query
      const replies = await findRepliesService(Number(limit), Number(offset))

      if (replies.length === 0) {
        res.status(200).json([])
      } else {
        res.status(200).json(replies)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const createReply = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { comment_id, reply_text, parent_id } = req.body
      const user = req.user

      if (!reply_text) {
        badRequestError(res, 'reply_text is required fields')
        return
      }

      if (!comment_id && !parent_id) {
        badRequestError(res, 'both comment_id and parent_id cannnot be null')
        return
      }

      if (user) {
        const newReply = await createReplyService(
          comment_id,
          reply_text,
          parent_id,
          user.login,
        )
        res.status(201).json(newReply)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const updateReply = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { reply_id, reply_text } = req.body
      const user = req.user

      const replyToUpdate = await reply.findOne({
        where: { id: reply_id },
      })

      if (!replyToUpdate) {
        badRequestError(res, 'reply not found')
        return
      }

      if (replyToUpdate.author_login !== user?.login) {
        conflictError(res, 'only the author can update')
        return
      }

      const replies = await reply.findOne({
        where: { parent_id: replyToUpdate.id },
      })

      if (replies) {
        conflictError(res, 'reply has replies')
        return
      }

      const result = await updateReplyService(reply_id, reply_text)

      res.status(200).send(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const deleteReply = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { reply_id } = req.body
      const user = req.user

      const replyToDelete = await reply.findOne({
        where: { id: reply_id },
      })

      if (!replyToDelete) {
        badRequestError(res, 'reply not found')
        return
      }

      if (replyToDelete.author_login !== user?.login) {
        conflictError(res, 'only the author can delete')
        return
      }

      const replies = await reply.findOne({
        where: { parent_id: replyToDelete.id },
      })

      if (replies) {
        conflictError(res, 'reply has replies')
        return
      }

      const result = await deleteReplyService(reply_id)

      res.status(200).send(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
]
