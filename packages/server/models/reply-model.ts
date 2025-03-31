import { DataType } from 'sequelize-typescript'
import { Model, ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'
import { comment, reply } from '../db'

export type TReply = {
  comment_id: string
  reply_text: string
  parent_id: string
} & TBaseType

export interface ReplyInstance extends Model<TReply>, TReply {}

export const replyModel: ModelAttributes<ReplyInstance> = {
  ...BaseForumMixin,
  comment_id: {
    type: DataType.UUID,
    allowNull: true,
    references: {
      model: comment,
      key: 'id',
    },
  },
  reply_text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  parent_id: {
    type: DataType.UUID,
    allowNull: true,
    references: {
      model: reply,
      key: 'id',
    },
  },
}
