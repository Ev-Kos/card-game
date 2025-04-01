import { TTopic } from '../models/topic-modal'
import { comment, sequelize, topic } from '../db'
import { handlerServiceError } from '../utils/errors'

export const findTopicsService = async (limit: number, offset: number) => {
  try {
    const topics = await topic.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      include: {
        model: comment,
        as: 'comments',
        attributes: [],
      },
      attributes: {
        include: [
          [
            sequelize.cast(
              sequelize.fn('COUNT', sequelize.col('comments.id')),
              'INTEGER',
            ),
            'comments_count',
          ],
        ],
      },
      group: ['Topic.id'],
      subQuery: false,
    })
    return topics
  } catch (e) {
    return handlerServiceError(e, 'findTopicsService')
  }
}

export const createTopicService = async (
  title: string,
  description: string,
  author_login: string,
) => {
  try {
    const newTopic = await topic.create({
      title: title,
      description: description,
      author_login: author_login,
    })
    return newTopic
  } catch (e) {
    return handlerServiceError(e, 'createTopicService')
  }
}

export const updateTopicService = async (
  topic_id: string,
  updateData: Partial<Pick<TTopic, 'title' | 'description'>>,
) => {
  try {
    await topic.update(updateData, {
      where: { id: topic_id },
    })

    const updatedTopic = await topic.findOne({
      where: { id: topic_id },
    })

    return updatedTopic
  } catch (e) {
    return handlerServiceError(e, 'updateTopicService')
  }
}

export const deleteTopicService = async (
  topic_id: string,
): Promise<'OK' | void> => {
  try {
    await topic.destroy({
      where: { id: topic_id },
    })

    return 'OK'
  } catch (e) {
    return handlerServiceError(e, 'deleteTopicService')
  }
}
