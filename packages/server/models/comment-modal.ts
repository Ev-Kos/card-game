import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'
import { topic } from '../db'

type TComment = {
  topic_id: string
  comment: string
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
  comment: {
    type: DataType.TEXT,
    allowNull: false,
  },
}
