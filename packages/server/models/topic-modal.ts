import { DataType } from 'sequelize-typescript'
import { Model, ModelAttributes } from 'sequelize/types'
import { BaseForumMixin } from '../utils/mixins'
import { TBaseType } from '../utils/types'

export type TTopic = {
  title: string
  description: string
} & TBaseType

export interface TopicInstance extends Model<TTopic>, TTopic {}

export const topicModel: ModelAttributes<TopicInstance> = {
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
