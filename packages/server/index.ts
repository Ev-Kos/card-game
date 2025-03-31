import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '../../.env' })

import express, { json, urlencoded } from 'express'
import { sequelize } from './db'
import router from './routes/router'
import helmet from 'helmet'
import { errorHandler } from './utils/errors'
import xssClean from 'xss-clean'

const port = Number(process.env.SERVER_PORT) || 3001
const isDev = process.env.NODE_ENV === 'development'

const initDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection OK')

    if (isDev) {
      await sequelize.sync({ alter: true })
      console.log('Database synced')
    }
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  }
}

const startServer = async () => {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: process.env.EXTERNAL_SERVER_URL,
      credentials: true,
    }),
  )
  app.use(json({ limit: '10kb' }))
  app.use(urlencoded({ extended: true }))
  app.use(xssClean())

  app.use('/api', router)

  app.use(errorHandler)

  const server = app.listen(port, () => {
    console.log(`➜ 🎸 Server is listening on port: ${port}`)
    console.log(`➜ 🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
  })

  process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error)
    server.close(() => process.exit(1))
  })

  process.on('unhandledRejection', reason => {
    console.error('Unhandled Rejection:', reason)
    server.close(() => process.exit(1))
  })
  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log(`${signal} received: closing server`)
      server.close(async () => {
        await sequelize.close()
        console.log('Server and database connection closed')
        process.exit(0)
      })
    })
  })
}

;(async () => {
  try {
    await initDB()
    await startServer()
  } catch (error) {
    console.error('Failed to initialize application:', error)
    process.exit(1)
  }
})()
