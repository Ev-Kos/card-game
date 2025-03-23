import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '../../.env' })

import express from 'express'
import { sequelize } from './db'

const port = Number(process.env.SERVER_PORT) || 3001

sequelize
  .sync({ force: true })
  .then(() => {
    const app = express()
    app.use(cors())
    app.get('/', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
