import { UUIDV4 } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export const BaseForumMixin = {
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
  limit: {
    type: DataType.INTEGER,
    defaultValue: 10,
    allowNull: false,
    validate: {
      max: 100,
    },
  },
  offset: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  updatedAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
}
