import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '../../.env' })

import express from 'express'
import { sequelize } from './db'

const port = Number(process.env.SERVER_PORT) || 3001
const isDev = process.env.NODE_ENV === 'development'

const initDB = async () => {
  try {
    if (isDev) {
      await sequelize.sync()
      const app = express()
      app.use(cors())
      app.get('/', (_, res) => {
        res.json('👋 Howdy from the server :)')
      })

      app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
      })
    } else {
      // добавить миграции для production
      await sequelize.authenticate()
      console.log('Database connection OK')
    }
  } catch (error) {
    console.error('Database initialization failed:', error)
  }
}

initDB()
