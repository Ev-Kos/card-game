import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'

export type TTopic = {
  title: string
  description: string
} & TBaseType

export const topicModel: ModelAttributes<Model, TTopic> = {
  ...BaseForumMixin,
  title: {
    type: DataType.STRING(256),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 256],
    },
  },
  description: {
    type: DataType.TEXT,
    allowNull: false,
  },
}
