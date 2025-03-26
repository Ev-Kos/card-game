import { TTopic } from '../models/topic-modal'
import { comment, sequelize, topic } from '../db'

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
    throw new Error(
      `Ошибка получения topics:${e instanceof Error ? e.message : e}`,
    )
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
      comment_count: 0,
    })
    return newTopic
  } catch (e) {
    throw new Error(
      `Ошибка создания topic:${e instanceof Error ? e.message : e}`,
    )
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
    const updatedTopic = (await topic.findOne({
      where: { id: topic_id },
    })) as TTopic | null

    return updatedTopic
  } catch (e) {
    throw new Error(
      `Ошибка обновления topic:${e instanceof Error ? e.message : e}`,
    )
  }
}

export const deleteTopicService = async (topic_id: string): Promise<'OK'> => {
  try {
    await topic.destroy({
      where: { id: topic_id },
    })

    return 'OK'
  } catch (e) {
    throw new Error(
      `Ошибка удаления topic:${e instanceof Error ? e.message : e}`,
    )
  }
}
