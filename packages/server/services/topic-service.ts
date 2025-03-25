import { topic } from '../db'

export const findTopicsService = async (limit: number, offset: number) => {
  try {
    const topics = await topic.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
    })
    return topics
  } catch (e) {
    throw new Error(`Ошибка получения topics:${e}`)
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
    throw new Error(`Ошибка создания topic:${e}`)
  }
}
