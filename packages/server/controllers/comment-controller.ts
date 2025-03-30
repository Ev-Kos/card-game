import {
  createCommentService,
  deleteCommentService,
  findCommentsService,
  updateCommentService,
} from '../services/comment-service'
import { badRequestError, conflictError } from '../utils/errors'
import { comment, reply } from '../db'
import { withErrorHandling } from '../middlewares/with-error-handling'

export const findComments = withErrorHandling(async (req, res) => {
  const { limit, offset } = req.query
  const comments = await findCommentsService(Number(limit), Number(offset))

  res.status(200).json(comments)
})

export const createComment = withErrorHandling(async (req, res) => {
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
})

export const updateComment = withErrorHandling(async (req, res) => {
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
})

export const deleteComment = withErrorHandling(async (req, res) => {
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
})
