import { badRequestError, conflictError, errorHandler } from '../utils/errors'
import {
  createTopicService,
  deleteTopicService,
  findTopicsService,
} from '../services/topic-service'
import { Request, Response } from 'express'
import { topic } from '../db'
import { checkAuth } from '../middlewares/check-auth'
import { TTopic } from '../models/topic-modal'

export const findTopics = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, offset } = req.body
      const topics = await findTopicsService(Number(limit), Number(offset))

      if (topics.length === 0) {
        res.status(200).json([])
      } else {
        res.status(200).json(topics)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

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

      if (user) {
        const newTopic = await createTopicService(
          title,
          description,
          user.login,
        )
        res.status(201).json(newTopic)
      }
    } catch (error) {
      errorHandler(res, error)
    }
  },
]

export const deleteTopic = [
  checkAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { topic_id } = req.body
      const user = req.user

      const topicToDelete = (await topic.findOne({
        where: { id: topic_id },
      })) as TTopic | null

      if (!topicToDelete) {
        badRequestError(res, 'topic not found')
        return
      }

      if (topicToDelete.author_login !== user?.login) {
        conflictError(res, 'only the author can delete')
        return
      }

      if (topicToDelete.comments_count && topicToDelete.comments_count !== 0) {
        conflictError(res, 'topic has comments')
        return
      }

      const result = await deleteTopicService(topic_id)

      res.status(200).send(result)
    } catch (error) {
      errorHandler(res, error)
    }
  },
]
