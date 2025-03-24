import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'
import { comment, reply } from '../db'

type TReply = {
  comment_id: string
  reply: string
  parent_id: string
} & TBaseType

export const replyModel: ModelAttributes<Model, TReply> = {
  ...BaseForumMixin,
  comment_id: {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: comment,
      key: 'id',
    },
  },
  reply: {
    type: DataType.TEXT,
    allowNull: false,
  },
  parent_id: {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: reply,
      key: 'id',
    },
  },
}
