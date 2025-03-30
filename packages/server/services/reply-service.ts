import { reply, sequelize } from '../db'

export const findRepliesService = async (limit: number, offset: number) => {
  try {
    const replies = await reply.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      include: {
        model: reply,
        as: 'parentReply',
        attributes: [],
      },
      attributes: {
        include: [
          [
            sequelize.cast(
              sequelize.fn('COUNT', sequelize.col('parentReply.id')),
              'INTEGER',
            ),
            'replies_count',
          ],
        ],
      },
      group: ['Reply.id'],
      subQuery: false,
    })
    return replies
  } catch (e) {
    throw new Error(
      `Ошибка получения replies:${e instanceof Error ? e.message : e}`,
    )
  }
}

export const createReplyService = async (
  comment_id: string,
  reply_text: string,
  parent_id: string,
  author_login: string,
) => {
  try {
    const newReply = await reply.create({
      comment_id: comment_id,
      reply_text: reply_text,
      parent_id: parent_id,
      author_login: author_login,
    })
    return newReply
  } catch (e) {
    throw new Error(
      `Ошибка создания reply:${e instanceof Error ? e.message : e}`,
    )
  }
}

export const updateReplyService = async (
  reply_id: string,
  reply_text: string,
) => {
  try {
    await reply.update(
      { reply_text },
      {
        where: { id: reply_id },
      },
    )
    const updatedReply = await reply.findOne({
      where: { id: reply_id },
    })

    return updatedReply
  } catch (e) {
    throw new Error(
      `Ошибка обновления reply:${e instanceof Error ? e.message : e}`,
    )
  }
}

export const deleteReplyService = async (reply_id: string): Promise<'OK'> => {
  try {
    await reply.destroy({
      where: { id: reply_id },
    })

    return 'OK'
  } catch (e) {
    throw new Error(
      `Ошибка удаления reply:${e instanceof Error ? e.message : e}`,
    )
  }
}
