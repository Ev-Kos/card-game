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
    throw new Error('Ошибка получения topics')
  }
}
