import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '../../.env' })

import express, { json } from 'express'
import { sequelize } from './db'
import router from './routes/router'

const port = Number(process.env.SERVER_PORT) || 3001
const isDev = process.env.NODE_ENV === 'development'

const initDB = async () => {
  try {
    const app = express()
    app.use(cors())
    app.use(json())
    app.use(router)

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })

    if (isDev) {
      await sequelize.sync()
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
