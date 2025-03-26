import { replyModel } from './models/reply-model'
import { commentModel } from './models/comment-modal'
import { topicModel } from './models/topic-modal'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  dialectOptions: {
    quoteIdentifiers: true,
  },
  logging: console.log,
}

const sequelize = new Sequelize(sequelizeOptions)

const topic = sequelize.define('Topic', topicModel, {})
const comment = sequelize.define('Comment', commentModel, {})
const reply = sequelize.define('Reply', replyModel, {})

topic.hasMany(comment, { foreignKey: 'topic_id', as: 'comments' })
comment.belongsTo(topic, { foreignKey: 'topic_id', as: 'topic' })
comment.hasMany(reply, { foreignKey: 'comment_id', as: 'replies' })
reply.belongsTo(comment, { foreignKey: 'comment_id', as: 'comment' })
reply.hasMany(reply, { foreignKey: 'parent_id', as: 'parentReply' })
reply.belongsTo(reply, { foreignKey: 'parent_id', as: 'parent' })

export { sequelize, topic, comment, reply }
