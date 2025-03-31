import { TComment } from '../models/comment-modal'
import { comment, reply, sequelize } from '../db'
import { handlerServiceError } from '../utils/errors'

export const findCommentsService = async (limit: number, offset: number) => {
  try {
    const comments = await comment.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      include: {
        model: reply,
        as: 'replies',
        attributes: [],
      },
      attributes: {
        include: [
          [
            sequelize.cast(
              sequelize.fn('COUNT', sequelize.col('replies.id')),
              'INTEGER',
            ),
            'replies_count',
          ],
        ],
      },
      group: ['Comment.id'],
      subQuery: false,
    })
    return comments
  } catch (e) {
    return handlerServiceError(e, 'findCommentsService')
  }
}

export const createCommentService = async (
  topic_id: string,
  comment_text: string,
  author_login: string,
) => {
  try {
    const newTopic = await comment.create({
      topic_id: topic_id,
      comment_text: comment_text,
      author_login: author_login,
    })
    return newTopic
  } catch (e) {
    return handlerServiceError(e, 'createCommentService')
  }
}

export const updateCommentService = async (
  comment_id: string,
  updateData: Partial<Pick<TComment, 'comment_text'>>,
) => {
  try {
    await comment.update(updateData, {
      where: { id: comment_id },
    })
    const updatedTopic = await comment.findOne({
      where: { id: comment_id },
    })

    return updatedTopic
  } catch (e) {
    return handlerServiceError(e, 'updateCommentService')
  }
}

export const deleteCommentService = async (
  comment_id: string,
): Promise<'OK' | void> => {
  try {
    await comment.destroy({
      where: { id: comment_id },
    })

    return 'OK'
  } catch (e) {
    return handlerServiceError(e, 'deleteCommentService')
  }
}
