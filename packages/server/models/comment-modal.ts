import { DataType } from 'sequelize-typescript'
import { Model, ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'
import { topic } from '../db'

export type TComment = {
  topic_id: string
  comment_text: string
} & TBaseType

export interface CommentInstance extends Model<TComment>, TComment {}

export const commentModel: ModelAttributes<CommentInstance> = {
  ...BaseForumMixin,
  topic_id: {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: topic,
      key: 'id',
    },
  },
  comment_text: {
    type: DataType.TEXT,
    allowNull: false,
  },
}
