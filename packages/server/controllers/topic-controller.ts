import {
  badRequestError,
  conflictError,
  errorHandler,
  unauthorizedError,
} from '../utils/errors'
import {
  createTopicService,
  findTopicsService,
} from '../services/topic-service'
import { Request, Response } from 'express'
import { topic } from '../db'
import { checkAuth } from '../middlewares/check-auth'

export const findTopics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { limit, offset } = req.body

    const topics = await findTopicsService(Number(limit), Number(offset))

    if (topics.length === 0) {
      res.status(200).json([])
    } else {
      res.status(200).json(topics)
    }
  } catch (error) {
    badRequestError(res, error as Error)
  }
}

export const createTopic = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description } = req.body
      const user = req.user

      if (!title || !description) {
        badRequestError(res, 'title and description are required fields')
        return
      }

      if (title.length > 256) {
        badRequestError(res, 'the max len of the title cannot exceed 256')
        return
      }

      const existingTopic = await topic.findOne({ where: { title } })
      if (existingTopic) {
        conflictError(res, 'topic with this title already exists')
        return
      }

      if (!user) {
        unauthorizedError(res, 'User not authenticated')
        return
      }

      if (user) {
        const newTopic = await createTopicService(
          title,
          description,
          user.login,
        )
        res.status(201).json({ newTopic })
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]
