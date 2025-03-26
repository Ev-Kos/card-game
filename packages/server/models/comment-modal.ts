import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'
import { topic } from '../db'

export type TComment = {
  topic_id: string
  comment_text: string
  replies_count?: number
} & TBaseType

export const commentModel: ModelAttributes<Model, TComment> = {
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
