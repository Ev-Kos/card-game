import { ModelAttributes, UUIDV4 } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'
import { TBaseType } from './types'

export const BaseForumMixin: ModelAttributes<Model<TBaseType>> = {
  id: {
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  author_login: {
    type: DataType.STRING(20),
    validate: {
      len: [3, 20] as [number, number],
    },
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
    field: 'create_at',
    defaultValue: DataType.NOW,
  },
  updatedAt: {
    type: DataType.DATE,
    field: 'update_at',
    defaultValue: DataType.NOW,
  },
}
