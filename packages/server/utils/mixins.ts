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
  createdAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  updatedAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
}
